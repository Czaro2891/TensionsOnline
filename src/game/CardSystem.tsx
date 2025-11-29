import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, Clock, Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';

export interface GameCard {
  id: string;
  title: string;
  teaser: string;
  instruction: string;
  level: 'soft' | 'hot' | 'spicy';
  category: string;
  duration: number;
  performer: 'player1' | 'player2';
  isCustom?: boolean;
}

interface CardSystemProps {
  card: GameCard;
  isPerformer: boolean;
  onComplete: () => void;
  onPause: () => void;
  onEmergencyStop: () => void;
  timeLeft: number;
  isPaused: boolean;
}

const CardSystem: React.FC<CardSystemProps> = ({
  card,
  isPerformer,
  onComplete,
  onPause,
  onEmergencyStop,
  timeLeft,
  isPaused
}) => {
  const [showInstruction, setShowInstruction] = useState(isPerformer);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const levelColors = {
    soft: 'from-green-500 to-emerald-600',
    hot: 'from-orange-500 to-red-600',
    spicy: 'from-red-500 to-pink-600'
  };

  const levelNames = {
    soft: 'Soft',
    hot: 'Hot', 
    spicy: 'Spicy'
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 10) return 'text-red-400';
    if (timeLeft <= 30) return 'text-yellow-400';
    return 'text-white';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative"
      >
        {/* Emergency Stop Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onEmergencyStop}
          className="absolute -top-4 -right-4 z-50 w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full shadow-lg flex items-center justify-center transition-colors"
          title="Emergency Stop"
        >
          <Square className="w-8 h-8 text-white" />
        </motion.button>

        {/* Card Container */}
        <div className={`bg-gradient-to-br ${levelColors[card.level]} rounded-2xl shadow-2xl overflow-hidden`}>
          {/* Header */}
          <div className="bg-black/30 backdrop-blur-sm p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  card.level === 'soft' ? 'bg-green-400' :
                  card.level === 'hot' ? 'bg-orange-400' : 'bg-red-400'
                }`} />
                <span className="text-white font-semibold">{levelNames[card.level]} • {card.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
                <button
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {cameraEnabled ? <Eye className="w-4 h-4 text-white" /> : <EyeOff className="w-4 h-4 text-white" />}
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {showInstruction ? (
                <motion.div
                  key="instruction"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Your Secret Task</h3>
                    <p className="text-white/80">Only you can see these instructions</p>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-black/30 backdrop-blur-sm rounded-xl p-6"
                  >
                    <p className="text-white text-lg leading-relaxed">{card.instruction}</p>
                  </motion.div>

                  <div className="text-center">
                    <p className="text-white/60 text-sm">Time remaining:</p>
                    <motion.div
                      key={timeLeft}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className={`text-4xl font-bold ${getTimeColor()}`}
                    >
                      {formatTime(timeLeft)}
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="teaser"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="text-center space-y-6"
                >
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Something Exciting Awaits...</h3>
                    <p className="text-white/90 text-lg italic">{card.teaser}</p>
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="bg-black/30 backdrop-blur-sm rounded-xl p-6"
                  >
                    <p className="text-white/80 mb-4">Your partner is receiving private instructions</p>
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="w-5 h-5 text-white/60" />
                      <span className={`text-2xl font-bold ${getTimeColor()}`}>
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </motion.div>

                  <p className="text-white/60 text-sm">Enjoy the anticipation...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="bg-black/30 backdrop-blur-sm p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPause}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  {isPaused ? <Play className="w-4 h-4 text-white" /> : <Pause className="w-4 h-4 text-white" />}
                  <span className="text-white font-medium">{isPaused ? 'Resume' : 'Pause'}</span>
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                disabled={timeLeft > 0}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  timeLeft === 0
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {timeLeft === 0 ? 'Complete Task' : 'Wait for Timer'}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Privacy Toggle for Performer */}
        {isPerformer && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstruction(!showInstruction)}
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {showInstruction ? 'Hide Instructions' : 'Show Instructions'}
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CardSystem;