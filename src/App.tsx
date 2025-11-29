import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LobbySystem from './lobby/LobbySystem';
import GameInterface from './game/GameInterface';
import CustomCardManager from './game/CustomCardManager';
import { GameCard } from './game/CardSystem';
import { ConsentData } from './safety/ConsentSystem';

interface GameSession {
  roomId: string;
  userId: string;
  intensityLevel: 'soft' | 'hot' | 'spicy';
  consentData: ConsentData;
  customCards: GameCard[];
}

type AppView = 'lobby' | 'game' | 'card-manager';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('lobby');
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [customCards, setCustomCards] = useState<GameCard[]>([]);

  // Generate user ID on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      setUserId(newUserId);
      localStorage.setItem('userId', newUserId);
    }
  }, []);

  // Load custom cards when userId is available
  useEffect(() => {
    if (!userId) return;

    const storedCards = localStorage.getItem(`customCards_${userId}`);
    if (storedCards) {
      try {
        const cards = JSON.parse(storedCards);
        setCustomCards(cards);
      } catch (error) {
        console.error('Failed to load custom cards:', error);
      }
    }
  }, [userId]);

  // Handle game start
  const handleGameStart = (roomId: string, intensityLevel: 'soft' | 'hot' | 'spicy', consentData: ConsentData) => {
    const session: GameSession = {
      roomId,
      userId,
      intensityLevel,
      consentData,
      customCards
    };
    
    setGameSession(session);
    setCurrentView('game');
  };

  // Handle game end
  const handleGameEnd = () => {
    setGameSession(null);
    setCurrentView('lobby');
  };

  // Handle custom cards update
  const handleCustomCardsUpdate = (cards: GameCard[]) => {
    setCustomCards(cards);
    if (gameSession) {
      setGameSession(prev => prev ? { ...prev, customCards: cards } : null);
    }
  };

  // Navigation menu
  const Navigation = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-6 right-6 z-50"
    >
      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 flex space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('lobby')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            currentView === 'lobby' 
              ? 'bg-purple-600 text-white' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          Lobby
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('card-manager')}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            currentView === 'card-manager' 
              ? 'bg-purple-600 text-white' 
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          Custom Cards
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'lobby' && (
          <motion.div
            key="lobby"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <Navigation />
            <LobbySystem userId={userId} onGameStart={handleGameStart} />
          </motion.div>
        )}

        {currentView === 'game' && gameSession && (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <GameInterface
              roomId={gameSession.roomId}
              userId={gameSession.userId}
              intensityLevel={gameSession.intensityLevel}
              customCards={gameSession.customCards}
              onGameEnd={handleGameEnd}
            />
          </motion.div>
        )}

        {currentView === 'card-manager' && (
          <motion.div
            key="card-manager"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Navigation />
            <CustomCardManager
              userId={userId}
              onCardsUpdate={handleCustomCardsUpdate}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Screen */}
      <AnimatePresence>
        {!userId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Strip in the Dark</h2>
              <p className="text-gray-300">Initializing your intimate adventure...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;