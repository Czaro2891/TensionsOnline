import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Join, Settings, Info, Play, Clock, Eye, EyeOff } from 'lucide-react';
import ConsentSystem, { ConsentData } from '../safety/ConsentSystem';

interface Room {
  id: string;
  name: string;
  playerCount: number;
  maxPlayers: number;
  intensityLevel: 'soft' | 'hot' | 'spicy';
  hasPassword: boolean;
  isPrivate: boolean;
}

interface LobbySystemProps {
  userId: string;
  onGameStart: (roomId: string, intensityLevel: 'soft' | 'hot' | 'spicy', consentData: ConsentData) => void;
}

const LobbySystem: React.FC<LobbySystemProps> = ({ userId, onGameStart }) => {
  const [showCreateRoom, setShowCreateRoom] = false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [password, setPassword] = useState('');
  
  // Room creation form
  const [roomForm, setRoomForm] = useState({
    name: '',
    intensityLevel: 'soft' as 'soft' | 'hot' | 'spicy',
    isPrivate: false,
    password: '',
    maxPlayers: 2
  });

  // Generate room code
  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Mock room data
  useEffect(() => {
    const mockRooms: Room[] = [
      {
        id: 'room-001',
        name: 'Sensual Beginnings',
        playerCount: 1,
        maxPlayers: 2,
        intensityLevel: 'soft',
        hasPassword: false,
        isPrivate: false
      },
      {
        id: 'room-002',
        name: 'Heated Encounters',
        playerCount: 1,
        maxPlayers: 2,
        intensityLevel: 'hot',
        hasPassword: true,
        isPrivate: false
      },
      {
        id: 'room-003',
        name: 'Intimate Secrets',
        playerCount: 0,
        maxPlayers: 2,
        intensityLevel: 'spicy',
        hasPassword: false,
        isPrivate: true
      }
    ];
    setAvailableRooms(mockRooms);
  }, []);

  // Handle room creation
  const handleCreateRoom = () => {
    if (!roomForm.name.trim()) {
      alert('Please enter a room name');
      return;
    }

    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: roomForm.name,
      playerCount: 1,
      maxPlayers: roomForm.maxPlayers,
      intensityLevel: roomForm.intensityLevel,
      hasPassword: !!roomForm.password,
      isPrivate: roomForm.isPrivate
    };

    setSelectedRoom(newRoom);
    setShowConsent(true);
  };

  // Handle room joining
  const handleJoinRoom = (room: Room) => {
    if (room.hasPassword) {
      setSelectedRoom(room);
      setShowJoinRoom(true);
    } else {
      setSelectedRoom(room);
      setShowConsent(true);
    }
  };

  // Handle consent completion
  const handleConsentComplete = (consentData: ConsentData) => {
    if (selectedRoom) {
      onGameStart(selectedRoom.id, selectedRoom.intensityLevel, consentData);
    }
  };

  // Handle consent rejection
  const handleConsentRejected = () => {
    setShowConsent(false);
    setSelectedRoom(null);
  };

  const intensityColors = {
    soft: 'from-green-500 to-emerald-600',
    hot: 'from-orange-500 to-red-600',
    spicy: 'from-red-500 to-pink-600'
  };

  const intensityNames = {
    soft: 'Soft',
    hot: 'Hot',
    spicy: 'Spicy'
  };

  if (showConsent) {
    return (
      <ConsentSystem
        onConsentComplete={handleConsentComplete}
        onConsentRejected={handleConsentRejected}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 p-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <Users className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-white">Strip in the Dark</h1>
              <p className="text-gray-400">Find your perfect partner for an intimate adventure</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(true)}
            className="p-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Rooms */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Available Rooms</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateRoom(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Room</span>
                </motion.button>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {availableRooms.map((room) => (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition-all cursor-pointer"
                      onClick={() => handleJoinRoom(room)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{room.name}</h3>
                          <div className="flex items-center space-x-3 text-sm text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{room.playerCount}/{room.maxPlayers}</span>
                            </span>
                            {room.hasPassword && (
                              <span className="flex items-center space-x-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Password Protected</span>
                              </span>
                            )}
                            {room.isPrivate && (
                              <span className="flex items-center space-x-1">
                                <EyeOff className="w-4 h-4" />
                                <span>Private</span>
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${intensityColors[room.intensityLevel]}`}>
                          {intensityNames[room.intensityLevel]}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-gray-300 text-sm">
                          Click to join this {room.intensityLevel} intensity room
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoinRoom(room);
                          }}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Join Room
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {availableRooms.length === 0 && (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Users className="w-8 h-8 text-gray-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">No rooms available</h3>
                  <p className="text-gray-400 mb-6">Be the first to create a room and start the adventure!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCreateRoom(true)}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Create Your Room
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Join */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Join</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter room code..."
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!roomCode}
                  className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Join by Code
                </motion.button>
              </div>
            </div>

            {/* Intensity Guide */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Intensity Levels</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full" />
                  <div>
                    <p className="text-white font-medium">Soft</p>
                    <p className="text-gray-400 text-sm">Light teasing and playful interaction</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-orange-500 rounded-full" />
                  <div>
                    <p className="text-white font-medium">Hot</p>
                    <p className="text-gray-400 text-sm">Sensual challenges with moderate intensity</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full" />
                  <div>
                    <p className="text-white font-medium">Spicy</p>
                    <p className="text-gray-400 text-sm">Intimate challenges for experienced players</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Info */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Safety First</h3>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">•</span>
                  <span>Safeword: "STOP" pauses immediately</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">•</span>
                  <span>No recording or screenshots allowed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">•</span>
                  <span>Encrypted video/audio streams</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400">•</span>
                  <span>Consent required before gameplay</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Create Room Modal */}
      <AnimatePresence>
        {showCreateRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Create Room</h2>
                <button
                  onClick={() => setShowCreateRoom(false)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Room Name</label>
                  <input
                    type="text"
                    value={roomForm.name}
                    onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })}
                    placeholder="Enter a tempting room name..."
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Intensity Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['soft', 'hot', 'spicy'] as const).map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setRoomForm({ ...roomForm, intensityLevel: level })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          roomForm.intensityLevel === level
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                          level === 'soft' ? 'bg-green-500' :
                          level === 'hot' ? 'bg-orange-500' : 'bg-red-500'
                        }`} />
                        <p className="text-white text-sm font-medium capitalize">{level}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={roomForm.isPrivate}
                      onChange={(e) => setRoomForm({ ...roomForm, isPrivate: e.target.checked })}
                      className="rounded"
                    />
                    <span>Private Room (hidden from public list)</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={!!roomForm.password}
                      onChange={(e) => setRoomForm({ ...roomForm, password: e.target.checked ? 'password123' : '' })}
                      className="rounded"
                    />
                    <span>Password Protected</span>
                  </label>
                </div>

                {roomForm.password && (
                  <div>
                    <label className="block text-white font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={roomForm.password}
                      onChange={(e) => setRoomForm({ ...roomForm, password: e.target.value })}
                      placeholder="Enter room password..."
                      className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreateRoom(false)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateRoom}
                  disabled={!roomForm.name.trim()}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Create & Start
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Join Room Modal */}
      <AnimatePresence>
        {showJoinRoom && selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Join Room</h2>
                <button
                  onClick={() => {
                    setShowJoinRoom(false);
                    setSelectedRoom(null);
                  }}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{selectedRoom.name}</h3>
                <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${intensityColors[selectedRoom.intensityLevel]}`}>
                  {intensityNames[selectedRoom.intensityLevel]} Intensity
                </div>
              </div>

              {selectedRoom.hasPassword && (
                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Room Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter room password..."
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowJoinRoom(false);
                    setSelectedRoom(null);
                  }}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (selectedRoom.hasPassword && !password) {
                      alert('Please enter the room password');
                      return;
                    }
                    setShowJoinRoom(false);
                    setShowConsent(true);
                  }}
                  disabled={selectedRoom.hasPassword && !password}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Join Room
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LobbySystem;