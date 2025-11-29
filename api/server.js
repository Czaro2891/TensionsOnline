// Vercel Serverless Function for API endpoints
// Note: Socket.IO requires persistent connections - use separate backend service

const { v4: uuidv4 } = require('uuid');

// Shared state (in production, use Redis or external database)
// This is in-memory and will reset on each deployment
const gameRooms = new Map();

class GameRoom {
  constructor(id, name, intensityLevel, maxPlayers = 2) {
    this.id = id;
    this.name = name;
    this.intensityLevel = intensityLevel;
    this.maxPlayers = maxPlayers;
    this.players = new Map();
    this.gameState = 'waiting';
    this.createdAt = new Date();
    this.hasPassword = false;
    this.password = null;
    this.isPrivate = false;
  }

  getPlayerCount() {
    return this.players.size;
  }

  isFull() {
    return this.players.size >= this.maxPlayers;
  }

  isEmpty() {
    return this.players.size === 0;
  }
}

// Cleanup inactive rooms
const cleanupInactiveRooms = () => {
  const now = new Date();
  const inactiveThreshold = 30 * 60 * 1000; // 30 minutes
  
  for (const [roomId, room] of gameRooms.entries()) {
    const roomAge = now - room.createdAt;
    if (room.isEmpty() && roomAge > inactiveThreshold) {
      gameRooms.delete(roomId);
    }
  }
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true'
};

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).end();
  }

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  cleanupInactiveRooms();

  const { pathname } = new URL(req.url || '/', `http://${req.headers.host}`);

  try {
    // Health check
    if (pathname === '/api/health' && req.method === 'GET') {
      return res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'API is running (Note: Socket.IO endpoints need separate backend)'
      });
    }

    // Get rooms
    if (pathname === '/api/rooms' && req.method === 'GET') {
      const publicRooms = Array.from(gameRooms.values())
        .filter(room => !room.isPrivate)
        .map(room => ({
          id: room.id,
          code: room.id,
          name: room.name,
          playerCount: room.getPlayerCount(),
          maxPlayers: room.maxPlayers,
          intensityLevel: room.intensityLevel,
          hasPassword: room.hasPassword,
          isPrivate: room.isPrivate
        }));
      
      return res.status(200).json(publicRooms);
    }

    // Create room
    if (pathname === '/api/rooms/create' && req.method === 'POST') {
      let body;
      try {
        body = await getRequestBody(req);
      } catch (error) {
        return res.status(400).json({ success: false, error: 'Invalid request body' });
      }

      const { name, intensityLevel, isPrivate, password } = body;
      
      if (!name || !intensityLevel) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      const roomId = uuidv4().substring(0, 8).toUpperCase();
      
      const room = new GameRoom(roomId, name, intensityLevel);
      room.isPrivate = isPrivate || false;
      room.hasPassword = !!password;
      room.password = password || null;
      
      gameRooms.set(roomId, room);
      
      return res.status(200).json({
        success: true,
        roomId,
        roomCode: roomId,
        room: {
          id: roomId,
          code: roomId,
          name: room.name,
          intensityLevel: room.intensityLevel,
          hasPassword: room.hasPassword,
          isPrivate: room.isPrivate
        }
      });
    }

    // 404 for unknown routes
    return res.status(404).json({ error: 'Not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper to parse request body
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}
