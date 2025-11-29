import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ConsentSystemProps {
  onConsentComplete: (consent: ConsentData) => void;
  onConsentRejected: () => void;
}

export interface ConsentData {
  isAdult: boolean;
  mutualConsent: boolean;
  intensityLevel: 'soft' | 'hot' | 'spicy';
  safewordAcknowledged: boolean;
  noRecordingAgreed: boolean;
  boundariesAcknowledged: boolean;
}

const ConsentSystem: React.FC<ConsentSystemProps> = ({ onConsentComplete, onConsentRejected }) => {
  const [step, setStep] = useState(0);
  const [consentData, setConsentData] = useState<ConsentData>({
    isAdult: false,
    mutualConsent: false,
    intensityLevel: 'soft',
    safewordAcknowledged: false,
    noRecordingAgreed: false,
    boundariesAcknowledged: false
  });

  const steps = [
    {
      title: "Age Verification",
      description: "This game contains adult content. You must be 18+ to continue.",
      icon: Shield,
      field: "isAdult"
    },
    {
      title: "Mutual Consent",
      description: "Both players must willingly participate in this experience.",
      icon: CheckCircle,
      field: "mutualConsent"
    },
    {
      title: "Intensity Selection",
      description: "Choose your comfort level for the game's content.",
      icon: AlertTriangle,
      field: "intensityLevel"
    },
    {
      title: "Safety Briefing",
      description: "Understand the safeword system and emergency procedures.",
      icon: Shield,
      field: "safewordAcknowledged"
    },
    {
      title: "Privacy Agreement",
      description: "No recording, screenshots, or sharing of any content.",
      icon: XCircle,
      field: "noRecordingAgreed"
    },
    {
      title: "Boundary Acknowledgment",
      description: "Respect all boundaries and communicate openly.",
      icon: CheckCircle,
      field: "boundariesAcknowledged"
    }
  ];

  const intensityLevels = {
    soft: {
      name: "Soft",
      description: "Light teasing and playful interaction",
      color: "bg-green-500"
    },
    hot: {
      name: "Hot",
      description: "Sensual challenges with moderate intensity",
      color: "bg-orange-500"
    },
    spicy: {
      name: "Spicy / 18+",
      description: "Intimate challenges for experienced players",
      color: "bg-red-500"
    }
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onConsentComplete(consentData);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReject = () => {
    onConsentRejected();
  };

  const toggleConsent = (field: keyof ConsentData) => {
    setConsentData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const setIntensity = (level: 'soft' | 'hot' | 'spicy') => {
    setConsentData(prev => ({
      ...prev,
      intensityLevel: level
    }));
  };

  const isStepComplete = () => {
    const currentField = steps[step].field as keyof ConsentData;
    if (currentField === 'intensityLevel') {
      return true; // Intensity selection is always valid
    }
    return consentData[currentField] === true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="max-w-2xl w-full bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center mb-2">Safety First</h1>
          <p className="text-purple-100 text-center">Before we begin, let's ensure everyone is safe and comfortable</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Step {step + 1} of {steps.length}</span>
            <span className="text-sm text-gray-400">{Math.round(((step + 1) / steps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${steps[step].field === 'intensityLevel' ? 'bg-orange-500' : 'bg-purple-500'} mb-4`}
                >
                  {React.createElement(steps[step].icon, { className: "w-10 h-10 text-white" })}
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-4">{steps[step].title}</h2>
                <p className="text-gray-300 text-lg">{steps[step].description}</p>
              </div>

              {/* Step-specific content */}
              <div className="space-y-6">
                {steps[step].field === 'intensityLevel' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(intensityLevels).map(([key, level]) => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIntensity(key as 'soft' | 'hot' | 'spicy')}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          consentData.intensityLevel === key
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${level.color} mx-auto mb-3`} />
                        <h3 className="text-lg font-semibold text-white mb-2">{level.name}</h3>
                        <p className="text-sm text-gray-400">{level.description}</p>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleConsent(steps[step].field as keyof ConsentData)}
                    className={`w-full p-6 rounded-xl border-2 transition-all flex items-center justify-center space-x-3 ${
                      consentData[steps[step].field as keyof ConsentData]
                        ? 'border-green-500 bg-green-500/20'
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    {consentData[steps[step].field as keyof ConsentData] ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-gray-500" />
                    )}
                    <span className="text-white font-medium">
                      {consentData[steps[step].field as keyof ConsentData] ? 'I Agree' : 'Click to Agree'}
                    </span>
                  </motion.button>
                )}
              </div>

              {/* Safeword Information */}
              {steps[step].field === 'safewordAcknowledged' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-900/30 border border-red-500 rounded-lg"
                >
                  <h3 className="text-red-400 font-semibold mb-2">🛑 Safeword System</h3>
                  <p className="text-red-200 text-sm">
                    The safeword is "STOP". Saying this word will immediately pause the game. 
                    You can also click the emergency stop button at any time.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReject}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Decline & Exit
            </motion.button>

            <div className="flex space-x-4">
              {step > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevious}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Previous
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={!isStepComplete()}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  isStepComplete()
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {step === steps.length - 1 ? 'Complete Setup' : 'Next'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsentSystem;