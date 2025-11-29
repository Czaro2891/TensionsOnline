const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');
const winston = require('winston');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // File transports only in development
    ...(process.env.NODE_ENV !== 'production' ? [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ] : []),
    // Always use console
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Socket.IO configuration
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Game state management
const gameRooms = new Map();
const connectedUsers = new Map();

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

  addPlayer(userId, socketId) {
    if (this.players.size >= this.maxPlayers) {
      return false;
    }
    
    this.players.set(userId, {
      socketId,
      joinedAt: new Date(),
      isReady: false,
      mediaControls: { video: true, audio: true }
    });
    
    return true;
  }

  removePlayer(userId) {
    return this.players.delete(userId);
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

  broadcast(event, data, excludeSocketId = null) {
    this.players.forEach((player, userId) => {
      if (player.socketId !== excludeSocketId) {
        io.to(player.socketId).emit(event, data);
      }
    });
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/rooms', (req, res) => {
  const publicRooms = Array.from(gameRooms.values())
    .filter(room => !room.isPrivate)
    .map(room => ({
      id: room.id,
      code: room.id, // Room ID is the code
      name: room.name,
      playerCount: room.getPlayerCount(),
      maxPlayers: room.maxPlayers,
      intensityLevel: room.intensityLevel,
      hasPassword: room.hasPassword,
      isPrivate: room.isPrivate
    }));
  
  res.json(publicRooms);
});

app.post('/api/rooms/create', (req, res) => {
  try {
    const { name, intensityLevel, isPrivate, password } = req.body;
    const roomId = uuidv4().substring(0, 8).toUpperCase();
    
    const room = new GameRoom(roomId, name, intensityLevel);
    room.isPrivate = isPrivate || false;
    room.hasPassword = !!password;
    room.password = password || null;
    
    gameRooms.set(roomId, room);
    
    logger.info(`Room created: ${roomId}`, { roomId, name, intensityLevel, isPrivate });
    
    res.json({
      success: true,
      roomId,
      roomCode: roomId, // Room ID is the code
      room: {
        id: roomId,
        code: roomId,
        name: room.name,
        intensityLevel: room.intensityLevel,
        hasPassword: room.hasPassword,
        isPrivate: room.isPrivate
      }
    });
  } catch (error) {
    logger.error('Failed to create room:', error);
    res.status(500).json({ success: false, error: 'Failed to create room' });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);
  
  socket.on('join-room', (data) => {
    try {
      const { roomId, userId } = data;
      
      if (!gameRooms.has(roomId)) {
        socket.emit('error', { message: 'Room not found' });
        return;
      }
      
      const room = gameRooms.get(roomId);
      
      if (room.isFull()) {
        socket.emit('error', { message: 'Room is full' });
        return;
      }
      
      if (room.hasPassword && data.password !== room.password) {
        socket.emit('error', { message: 'Invalid password' });
        return;
      }
      
      // Join the room
      socket.join(roomId);
      room.addPlayer(userId, socket.id);
      connectedUsers.set(socket.id, { userId, roomId });
      
      // Notify other players
      socket.to(roomId).emit('player-joined', {
        userId,
        playerCount: room.getPlayerCount()
      });
      
      // Send current room state to the joining player
      socket.emit('room-state', {
        roomId,
        players: Array.from(room.players.keys()),
        playerCount: room.getPlayerCount(),
        gameState: room.gameState
      });

      // If there's already another player, notify them that someone joined
      // This helps with WebRTC negotiation
      if (room.getPlayerCount() > 1) {
        room.players.forEach((player, existingUserId) => {
          if (existingUserId !== userId) {
            io.to(player.socketId).emit('player-joined', {
              userId,
              playerCount: room.getPlayerCount()
            });
          }
        });
      }
      
      logger.info(`User ${userId} joined room ${roomId}`);
      
    } catch (error) {
      logger.error('Failed to join room:', error);
      socket.emit('error', { message: 'Failed to join room' });
    }
  });
  
  socket.on('offer', async (data) => {
    try {
      const { roomId, offer, userId } = data;
      socket.to(roomId).emit('offer', {
        offer,
        fromUserId: userId
      });
    } catch (error) {
      logger.error('Failed to handle offer:', error);
    }
  });
  
  socket.on('answer', async (data) => {
    try {
      const { roomId, answer, userId } = data;
      socket.to(roomId).emit('answer', {
        answer,
        fromUserId: userId
      });
    } catch (error) {
      logger.error('Failed to handle answer:', error);
    }
  });
  
  socket.on('ice-candidate', (data) => {
    try {
      const { roomId, candidate, userId } = data;
      socket.to(roomId).emit('ice-candidate', {
        candidate,
        fromUserId: userId
      });
    } catch (error) {
      logger.error('Failed to handle ICE candidate:', error);
    }
  });
  
  socket.on('media-control', (data) => {
    try {
      const { roomId, control, enabled, userId } = data;
      socket.to(roomId).emit('media-control', {
        control,
        enabled,
        fromUserId: userId
      });
    } catch (error) {
      logger.error('Failed to handle media control:', error);
    }
  });
  
  socket.on('game-action', (data) => {
    try {
      const { roomId, action, userId } = data;
      socket.to(roomId).emit('game-action', {
        action,
        fromUserId: userId
      });
    } catch (error) {
      logger.error('Failed to handle game action:', error);
    }
  });
  
  socket.on('safeword', (data) => {
    try {
      const { roomId, userId } = data;
      const room = gameRooms.get(roomId);
      
      if (room) {
        room.gameState = 'emergency';
        room.broadcast('safeword-activated', {
          userId,
          timestamp: new Date()
        });
      }
      
      logger.info(`Safeword activated in room ${roomId} by user ${userId}`);
    } catch (error) {
      logger.error('Failed to handle safeword:', error);
    }
  });
  
  socket.on('disconnect', () => {
    try {
      const userData = connectedUsers.get(socket.id);
      if (userData) {
        const { userId, roomId } = userData;
        const room = gameRooms.get(roomId);
        
        if (room) {
          room.removePlayer(userId);
          room.broadcast('player-left', {
            userId,
            playerCount: room.getPlayerCount()
          }, socket.id);
          
          // Clean up empty rooms
          if (room.isEmpty()) {
            gameRooms.delete(roomId);
            logger.info(`Room ${roomId} deleted (empty)`);
          }
        }
        
        connectedUsers.delete(socket.id);
        logger.info(`User disconnected: ${socket.id}`);
      }
    } catch (error) {
      logger.error('Failed to handle disconnect:', error);
    }
  });
});

// Cleanup inactive rooms periodically
setInterval(() => {
  const now = new Date();
  const inactiveThreshold = 30 * 60 * 1000; // 30 minutes
  
  for (const [roomId, room] of gameRooms.entries()) {
    const roomAge = now - room.createdAt;
    if (room.isEmpty() && roomAge > inactiveThreshold) {
      gameRooms.delete(roomId);
      logger.info(`Deleted inactive room: ${roomId}`);
    }
  }
}, 5 * 60 * 1000); // Check every 5 minutes

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, '0.0.0.0', () => {
  logger.info(`Strip in the Dark server running on port ${PORT}`);
  console.log(`🎭 Server running on port ${PORT}`);
  console.log(`🔒 Security features enabled`);
  console.log(`📡 WebSocket server ready for connections`);
});