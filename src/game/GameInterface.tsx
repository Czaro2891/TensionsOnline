import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, Clock, Users, Settings, MessageCircle, Heart } from 'lucide-react';
import WebRTCManager from '../webrtc/WebRTCManager';
import CardSystem, { GameCard } from './CardSystem';
import { defaultCards, getRandomCard } from './DefaultCards';

interface GameInterfaceProps {
  roomId: string;
  userId: string;
  intensityLevel: 'soft' | 'hot' | 'spicy';
  customCards: GameCard[];
  onGameEnd: () => void;
}

interface GameState {
  currentCard: GameCard | null;
  isPerformer: boolean;
  roundNumber: number;
  timeLeft: number;
  isPaused: boolean;
  gamePhase: 'waiting' | 'playing' | 'completed' | 'emergency';
  aiMessage: string;
  usedCards: string[];
}

const GameInterface: React.FC<GameInterfaceProps> = ({
  roomId,
  userId,
  intensityLevel,
  customCards,
  onGameEnd
}) => {
  const [gameState, setGameState] = useState<GameState>({
    currentCard: null,
    isPerformer: false,
    roundNumber: 1,
    timeLeft: 0,
    isPaused: false,
    gamePhase: 'waiting',
    aiMessage: 'Welcome to the game. Waiting for your partner to join...',
    usedCards: []
  });

  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'failed'>('connecting');
  const [showSettings, setShowSettings] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: 'ai' | 'user' }>>([]);

  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const aiSupervisorRef = React.useRef<any>(null);

  // AI Supervisor Messages
  const aiMessages = {
    waiting: [
      'The anticipation builds as you wait for your partner...',
      'Every moment of waiting makes what comes next more exciting...',
      'Soon, the real game will begin. Are you ready?'
    ],
    performer: [
      'Your partner watches with bated breath...',
      'Every movement you make is magnified in their eyes...',
      'You hold the power to drive them wild with anticipation...',
      'Your performance is their private show...'
    ],
    observer: [
      'Watch closely, every detail matters...',
      'They are performing just for you. Savor every moment...',
      'The tension builds with each passing second...',
      'You are the audience to their intimate performance...'
    ],
    transition: [
      'The game continues, building tension with each round...',
      'Round complete. The next challenge awaits...',
      'Your connection deepens with every shared moment...'
    ]
  };

  // Timer management
  useEffect(() => {
    if (gameState.timeLeft > 0 && !gameState.isPaused && gameState.gamePhase === 'playing') {
      timerRef.current = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (gameState.timeLeft === 0 && gameState.gamePhase === 'playing') {
      handleRoundComplete();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState.timeLeft, gameState.isPaused, gameState.gamePhase]);

  // AI Message rotation
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState.gamePhase === 'playing') {
        const messagePool = gameState.isPerformer ? aiMessages.performer : aiMessages.observer;
        const randomMessage = messagePool[Math.floor(Math.random() * messagePool.length)];
        setGameState(prev => ({ ...prev, aiMessage: randomMessage }));
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [gameState.gamePhase, gameState.isPerformer]);

  // Handle remote stream
  const handleRemoteStream = useCallback((stream: MediaStream) => {
    setRemoteStream(stream);
  }, []);

  // Handle connection status change
  const handleConnectionStatusChange = useCallback((status: 'connected' | 'disconnected' | 'connecting' | 'failed') => {
    setConnectionStatus(status);
    
    if (status === 'connected' && gameState.gamePhase === 'waiting') {
      startNewRound();
    } else if (status === 'disconnected') {
      setGameState(prev => ({ ...prev, gamePhase: 'emergency', aiMessage: 'Connection lost. Game paused.' }));
    }
  }, [gameState.gamePhase]);

  // Start new round
  const startNewRound = useCallback(() => {
    const allCards = [...defaultCards, ...customCards];
    const availableCards = allCards.filter(card => !gameState.usedCards.includes(card.id));
    
    if (availableCards.length === 0) {
      // Reset used cards if all have been used
      setGameState(prev => ({ ...prev, usedCards: [] }));
      return;
    }

    const card = getRandomCard(intensityLevel, gameState.usedCards);
    const isPerformer = Math.random() < 0.5;
    
    setGameState(prev => ({
      ...prev,
      currentCard: card,
      isPerformer,
      timeLeft: card.duration,
      gamePhase: 'playing',
      usedCards: [...prev.usedCards, card.id],
      aiMessage: isPerformer ? 
        'Your turn to perform. Your partner watches with anticipation...' :
        'Watch closely. Your partner is about to perform for you...'
    }));
  }, [intensityLevel, customCards, gameState.usedCards]);

  // Handle round completion
  const handleRoundComplete = useCallback(() => {
    const transitionMessage = aiMessages.transition[Math.floor(Math.random() * aiMessages.transition.length)];
    
    setGameState(prev => ({
      ...prev,
      currentCard: null,
      gamePhase: 'waiting',
      roundNumber: prev.roundNumber + 1,
      aiMessage: transitionMessage
    }));

    // Start next round after delay
    setTimeout(() => {
      startNewRound();
    }, 3000);
  }, [startNewRound]);

  // Handle pause/resume
  const handlePauseToggle = () => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
      aiMessage: !prev.isPaused ? 
        'Game paused. Take a moment to breathe and connect...' :
        'Game resumed. Let the tension continue to build...'
    }));
  };

  // Handle emergency stop
  const handleEmergencyStop = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: 'emergency',
      isPaused: true,
      aiMessage: 'Emergency stop activated. Both players must agree to continue.'
    }));
  };

  // Handle card completion
  const handleCardComplete = () => {
    if (gameState.currentCard && gameState.timeLeft === 0) {
      handleRoundComplete();
    }
  };

  // Add AI message to chat
  const addAIMessage = (message: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: message,
      sender: 'ai'
    }]);
  };

  // Game phase transitions
  useEffect(() => {
    switch (gameState.gamePhase) {
      case 'waiting':
        if (connectionStatus === 'connected') {
          addAIMessage(gameState.aiMessage);
        }
        break;
      case 'playing':
        addAIMessage(gameState.aiMessage);
        break;
      case 'emergency':
        addAIMessage('🛑 EMERGENCY STOP ACTIVATED 🛑');
        addAIMessage(gameState.aiMessage);
        break;
    }
  }, [gameState.gamePhase, gameState.aiMessage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700 p-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: gameState.gamePhase === 'playing' ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
            >
              <Heart className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-white">Strip in the Dark</h1>
              <p className="text-gray-400">Room: {roomId} • Round {gameState.roundNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowChat(!showChat)}
              className="p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
              className="p-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Game Area */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 relative">
          <WebRTCManager
            roomId={roomId}
            userId={userId}
            onRemoteStream={handleRemoteStream}
            onConnectionStatusChange={handleConnectionStatusChange}
            onError={(error) => console.error('WebRTC Error:', error)}
          />
        </div>

        {/* Side Panel */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-80 bg-gray-900/50 backdrop-blur-sm border-l border-gray-700 flex flex-col"
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Game Chat</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg ${
                      message.sender === 'ai' 
                        ? 'bg-purple-600/30 border border-purple-500/50' 
                        : 'bg-gray-700'
                    }`}
                  >
                    <p className={`text-sm ${
                      message.sender === 'ai' ? 'text-purple-200' : 'text-white'
                    }`}>
                      {message.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Display */}
      <AnimatePresence>
        {gameState.currentCard && gameState.gamePhase === 'playing' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-30"
          >
            <CardSystem
              card={gameState.currentCard}
              isPerformer={gameState.isPerformer}
              onComplete={handleCardComplete}
              onPause={handlePauseToggle}
              onEmergencyStop={handleEmergencyStop}
              timeLeft={gameState.timeLeft}
              isPaused={gameState.isPaused}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Status Overlay */}
      <AnimatePresence>
        {gameState.gamePhase !== 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center"
            >
              {gameState.gamePhase === 'waiting' && (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Clock className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-4">Preparing Next Round</h2>
                  <p className="text-gray-300 mb-6">{gameState.aiMessage}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3 }}
                    />
                  </div>
                </>
              )}

              {gameState.gamePhase === 'emergency' && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Square className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-red-400 mb-4">Emergency Stop</h2>
                  <p className="text-gray-300 mb-6">{gameState.aiMessage}</p>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setGameState(prev => ({ ...prev, gamePhase: 'waiting', isPaused: false }))}
                      className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Resume Game
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onGameEnd}
                      className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                    >
                      End Game
                    </motion.button>
                  </div>
                </>
              )}

              {gameState.gamePhase === 'completed' && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Users className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-4">Game Complete</h2>
                  <p className="text-gray-300 mb-6">
                    You've completed {gameState.roundNumber - 1} rounds together. 
                    Your connection has deepened through shared intimacy and trust.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onGameEnd}
                    className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Return to Lobby
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Message Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 right-4 z-10"
      >
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md">
          <p className="text-white text-sm italic">"{gameState.aiMessage}"</p>
          <p className="text-gray-400 text-xs mt-1">— AI Supervisor</p>
        </div>
      </motion.div>
    </div>
  );
};

export default GameInterface;