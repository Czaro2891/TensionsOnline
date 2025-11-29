import { GameCard } from '../game/CardSystem';

export interface AIContext {
  roomId: string;
  players: string[];
  currentRound: number;
  intensityLevel: 'soft' | 'hot' | 'spicy';
  gamePhase: 'waiting' | 'playing' | 'completed' | 'emergency';
  lastCard?: GameCard;
  usedCards: string[];
  playerStates: Map<string, {
    isReady: boolean;
    isPerformer: boolean;
    connectionStatus: 'connected' | 'disconnected';
    responseTime: number;
    engagementLevel: number;
  }>;
}

export interface AINarrative {
  id: string;
  text: string;
  tone: 'teasing' | 'encouraging' | 'sensual' | 'playful' | 'intimate';
  intensity: 'soft' | 'hot' | 'spicy';
  context: 'performer' | 'observer' | 'transition' | 'general';
}

class AISupervisor {
  private narratives: AINarrative[] = [];
  private context: AIContext | null = null;
  private messageQueue: string[] = [];
  private isActive = false;

  constructor() {
    this.initializeNarratives();
  }

  private initializeNarratives() {
    // Soft Level Narratives
    this.narratives.push(
      {
        id: 'soft-performer-001',
        text: 'Your partner watches with gentle curiosity. Every small movement you make becomes a precious moment for them.',
        tone: 'encouraging',
        intensity: 'soft',
        context: 'performer'
      },
      {
        id: 'soft-observer-001',
        text: 'Watch closely, but gently. They are sharing something intimate with you, and your attention is their reward.',
        tone: 'intimate',
        intensity: 'soft',
        context: 'observer'
      },
      {
        id: 'soft-transition-001',
        text: 'The beauty of anticipation lies in the waiting. Your connection grows stronger with each shared moment.',
        tone: 'encouraging',
        intensity: 'soft',
        context: 'transition'
      },
      {
        id: 'soft-general-001',
        text: 'In the gentle dance of glances and gestures, you find a language that words cannot express.',
        tone: 'intimate',
        intensity: 'soft',
        context: 'general'
      }
    );

    // Hot Level Narratives
    this.narratives.push(
      {
        id: 'hot-performer-001',
        text: 'The temperature rises with each movement. You hold their complete attention, and they hang on every gesture.',
        tone: 'sensual',
        intensity: 'hot',
        context: 'performer'
      },
      {
        id: 'hot-observer-001',
        text: 'Your pulse quickens as you watch. They perform just for you, and the intimacy of this moment is electric.',
        tone: 'sensual',
        intensity: 'hot',
        context: 'observer'
      },
      {
        id: 'hot-transition-001',
        text: 'The air between you crackles with unspoken promises. What comes next will test the boundaries of your desire.',
        tone: 'teasing',
        intensity: 'hot',
        context: 'transition'
      },
      {
        id: 'hot-general-001',
        text: 'Heat builds not from touch, but from the fierce attention you give each other across the digital divide.',
        tone: 'sensual',
        intensity: 'hot',
        context: 'general'
      }
    );

    // Spicy Level Narratives
    this.narratives.push(
      {
        id: 'spicy-performer-001',
        text: 'You are their fantasy made real. Every reveal, every gesture, burns itself into their memory.',
        tone: 'intimate',
        intensity: 'spicy',
        context: 'performer'
      },
      {
        id: 'spicy-observer-001',
        text: 'They bare themselves for you, piece by piece. This is trust made visible, desire made manifest.',
        tone: 'intimate',
        intensity: 'spicy',
        context: 'observer'
      },
      {
        id: 'spicy-transition-001',
        text: 'The line between watching and wanting blurs. You have seen each other truly, and there is no going back.',
        tone: 'intimate',
        intensity: 'spicy',
        context: 'transition'
      },
      {
        id: 'spicy-general-001',
        text: 'In this space between screens, you have created something raw and real. Desire speaks in the silence.',
        tone: 'intimate',
        intensity: 'spicy',
        context: 'general'
      }
    );

    // Playful narratives for all levels
    this.narratives.push(
      {
        id: 'playful-performer-001',
        text: 'You are a magician of misdirection, and they are your willing audience. Make them wonder what comes next.',
        tone: 'playful',
        intensity: 'soft',
        context: 'performer'
      },
      {
        id: 'playful-observer-001',
        text: 'They are playing games with you, and you love every second of it. Try to guess their next move.',
        tone: 'playful',
        intensity: 'soft',
        context: 'observer'
      }
    );

    // Encouraging narratives
    this.narratives.push(
      {
        id: 'encourage-performer-001',
        text: 'You are doing beautifully. Your confidence is the most attractive thing you could show them.',
        tone: 'encouraging',
        intensity: 'soft',
        context: 'performer'
      },
      {
        id: 'encourage-general-001',
        text: 'This connection you are building is something special. Trust the process and enjoy the journey.',
        tone: 'encouraging',
        intensity: 'soft',
        context: 'general'
      }
    );
  }

  public setContext(context: AIContext) {
    this.context = context;
  }

  public start() {
    this.isActive = true;
    this.beginNarrativeCycle();
  }

  public stop() {
    this.isActive = false;
    this.messageQueue = [];
  }

  public getNextMessage(): string | null {
    if (this.messageQueue.length > 0) {
      return this.messageQueue.shift() || null;
    }
    return this.generateContextualMessage();
  }

  private generateContextualMessage(): string {
    if (!this.context) {
      return this.getRandomNarrative('general', 'soft');
    }

    const { gamePhase, intensityLevel } = this.context;

    if (gamePhase === 'emergency') {
      return this.getEmergencyMessage();
    }

    if (gamePhase === 'waiting') {
      return this.getWaitingMessage();
    }

    if (gamePhase === 'playing') {
      return this.getPlayingMessage();
    }

    return this.getRandomNarrative('general', intensityLevel);
  }

  private getEmergencyMessage(): string {
    const emergencyMessages = [
      'Emergency stop activated. Both players must confirm safety before continuing.',
      'The safeword has been used. Please check in with each other and ensure comfort.',
      'Game paused for safety. Communication is key - talk to each other about what you need.',
      'Everything stops now. Your safety and comfort are the most important things.'
    ];
    
    return emergencyMessages[Math.floor(Math.random() * emergencyMessages.length)];
  }

  private getWaitingMessage(): string {
    if (!this.context) return 'Waiting for the game to begin...';

    const waitingMessages = [
      'The anticipation builds as you wait for your partner...',
      'Every moment of waiting makes what comes next more exciting...',
      'Soon, the real game will begin. Are you ready?',
      'The space between rounds is where desire grows...',
      'Take this time to breathe and prepare for what comes next.'
    ];

    return waitingMessages[Math.floor(Math.random() * waitingMessages.length)];
  }

  private getPlayingMessage(): string {
    if (!this.context) return 'The game is in progress...';

    const playerStates = Array.from(this.context.playerStates.values());
    const performer = playerStates.find(p => p.isPerformer);
    const observer = playerStates.find(p => !p.isPerformer);

    if (performer && observer) {
      const context = Math.random() < 0.5 ? 'performer' : 'observer';
      return this.getRandomNarrative(context, this.context.intensityLevel);
    }

    return this.getRandomNarrative('general', this.context.intensityLevel);
  }

  private getRandomNarrative(context: string, intensity: string): string {
    const filteredNarratives = this.narratives.filter(
      n => n.context === context && n.intensity === intensity
    );

    if (filteredNarratives.length === 0) {
      const fallbackNarratives = this.narratives.filter(
        n => n.context === 'general' && n.intensity === 'soft'
      );
      const randomIndex = Math.floor(Math.random() * fallbackNarratives.length);
      return fallbackNarratives[randomIndex]?.text || 'Enjoy this moment together.';
    }

    const randomIndex = Math.floor(Math.random() * filteredNarratives.length);
    return filteredNarratives[randomIndex].text;
  }

  private beginNarrativeCycle() {
    if (!this.isActive) return;

    // Add contextual messages to queue periodically
    setInterval(() => {
      if (this.isActive && this.messageQueue.length < 3) {
        const message = this.generateContextualMessage();
        this.messageQueue.push(message);
      }
    }, 15000); // Add new message every 15 seconds
  }

  public handleCardCompletion(card: GameCard, performerId: string, observerId: string) {
    if (!this.isActive) return;

    const completionMessages = {
      soft: [
        'Beautifully done. The intimacy between you grows with each shared moment.',
        'That was lovely. Your connection deepens through these gentle exchanges.',
        'Perfect. You are learning to speak each other\'s silent language.'
      ],
      hot: [
        'The temperature in the room just rose several degrees. Well played.',
        'That was electric. You both handled the heat beautifully.',
        'The tension builds deliciously. You are creating something special together.'
      ],
      spicy: [
        'Absolutely intoxicating. You have crossed into deeper intimacy.',
        'That was breathtaking. The trust between you is extraordinary.',
        'You have shared something profound. This connection is rare and beautiful.'
      ]
    };

    const messages = completionMessages[card.level] || completionMessages.soft;
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    this.messageQueue.push(message);
  }

  public handlePlayerDisconnection(userId: string) {
    if (!this.isActive) return;

    const disconnectionMessages = [
      'Connection lost. Please wait while we try to reconnect.',
      'Your partner seems to have connection issues. The game will pause for safety.',
      'Technical difficulties detected. Please check your connection and try again.'
    ];

    const message = disconnectionMessages[Math.floor(Math.random() * disconnectionMessages.length)];
    this.messageQueue.push(message);
  }

  public handleGameResume() {
    if (!this.isActive) return;

    const resumeMessages = [
      'Connection restored. Let\'s continue where we left off.',
      'Welcome back. The game resumes with even more anticipation.',
      'You\'re back together. The chemistry picks up right where it left off.'
    ];

    const message = resumeMessages[Math.floor(Math.random() * resumeMessages.length)];
    this.messageQueue.push(message);
  }

  public handleRoundTransition() {
    if (!this.isActive) return;

    const transitionMessages = [
      'Round complete. The next challenge awaits...',
      'Your connection deepens with each round. What comes next?',
      'Beautiful work. Ready for the next level of intimacy?',
      'The game continues, building tension with each exchange...'
    ];

    const message = transitionMessages[Math.floor(Math.random() * transitionMessages.length)];
    this.messageQueue.push(message);
  }
}

// Player Assist Bot
export class PlayerAssistBot {
  private playerId: string;
  private intensityLevel: 'soft' | 'hot' | 'spicy';
  private isActive = false;

  constructor(playerId: string, intensityLevel: 'soft' | 'hot' | 'spicy') {
    this.playerId = playerId;
    this.intensityLevel = intensityLevel;
  }

  public start() {
    this.isActive = true;
  }

  public stop() {
    this.isActive = false;
  }

  public getEncouragement(isPerformer: boolean, timeRemaining: number): string {
    if (!this.isActive) return '';

    if (isPerformer) {
      return this.getPerformerEncouragement(timeRemaining);
    } else {
      return this.getObserverEncouragement(timeRemaining);
    }
  }

  private getPerformerEncouragement(timeRemaining: number): string {
    const encouragements = {
      soft: [
        'You\'re doing wonderfully. Your partner is captivated.',
        'Every movement you make is perfect. Keep going.',
        'You look amazing. Trust yourself and enjoy this moment.',
        'Your confidence is beautiful. They can\'t look away.',
        timeRemaining <= 10 ? 'Almost there! You\'ve been incredible.' : 'Take your time. This is your moment.'
      ],
      hot: [
        'You\'re driving them wild. Keep building that tension.',
        'The way you move is absolutely intoxicating.',
        'You have them completely under your spell.',
        'Your sensuality is natural and captivating.',
        timeRemaining <= 10 ? 'Finish strong! You\'ve been magnificent.' : 'Tease them a little longer. You\'re doing great.'
      ],
      spicy: [
        'You are their ultimate fantasy right now.',
        'The way you\'re owning this moment is incredibly sexy.',
        'You\'re not just performing, you\'re creating art with your body.',
        'They will remember this moment for a long time.',
        timeRemaining <= 10 ? 'Make this ending unforgettable.' : 'Push the boundaries. You\'re in complete control.'
      ]
    };

    const messages = encouragements[this.intensityLevel] || encouragements.soft;
    return messages[Math.floor(Math.random() * messages.length)];
  }

  private getObserverEncouragement(timeRemaining: number): string {
    const encouragements = {
      soft: [
        'Your attention means everything to them.',
        'They can feel your gaze. Your appreciation shows.',
        'You\'re giving them the gift of being truly seen.',
        'Your patience and attention are incredibly attractive.',
        timeRemaining <= 10 ? 'What a beautiful moment you\'ve shared.' : 'Every second of watching deepens your connection.'
      ],
      hot: [
        'They can feel the heat of your attention.',
        'Your desire is palpable through the screen.',
        'The tension between you is electric.',
        'You\'re learning their body\'s secret language.',
        timeRemaining <= 10 ? 'What an incredible performance you\'ve witnessed.' : 'Let the anticipation build. It\'s delicious.'
      ],
      spicy: [
        'You\'re witnessing something incredibly intimate.',
        'They are completely vulnerable to you right now.',
        'This level of trust between you is rare and beautiful.',
        'You\'re seeing them in their most authentic moment.',
        timeRemaining <= 10 ? 'This will stay with you both forever.' : 'Savor every second of this private show.'
      ]
    };

    const messages = encouragements[this.intensityLevel] || encouragements.soft;
    return messages[Math.floor(Math.random() * messages.length)];
  }

  public getCountdownMessage(seconds: number): string {
    if (!this.isActive || seconds > 10) return '';

    const countdowns = {
      soft: [
        'Gently wrap up your moment.',
        'Start bringing it to a close.',
        'Perfect timing to finish.'
      ],
      hot: [
        'Build to your climax.',
        'Make this ending memorable.',
        'Leave them wanting more.'
      ],
      spicy: [
        'Make this finale explosive.',
        'Give them everything.',
        'Make them remember this forever.'
      ]
    };

    const messages = countdowns[this.intensityLevel] || countdowns.soft;
    return `${seconds}... ${messages[Math.floor(Math.random() * messages.length)]}`;
  }
}

export default AISupervisor;