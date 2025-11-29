# Strip in the Dark – TENSIONS Online Spicy Edition

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/strip-in-the-dark)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-18.x-blue.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.x-blue.svg)](https://reactjs.org/)
[![WebRTC](https://img.shields.io/badge/WebRTC-enabled-blue.svg)](https://webrtc.org/)

## 🔥 Overview

**Strip in the Dark – TENSIONS Online Spicy Edition** is a sophisticated adult entertainment platform designed for consenting couples to engage in intimate, remote experiences. This application combines cutting-edge WebRTC technology with carefully crafted game mechanics to create a safe, exciting, and consensual environment for adult play.

### Key Features

- **Real-time Video Communication**: High-quality, encrypted video streaming
- **Multi-Intensity Gameplay**: Soft, Hot, and Spicy difficulty levels
- **Custom Card System**: Create and share personalized game cards
- **AI-Powered Narration**: Intelligent assistance and encouragement
- **Comprehensive Safety**: Built-in consent management and emergency features
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🎯 Game Mechanics

### Intensity Levels

#### 🔴 Soft (Beginner)
- Light teasing and playful interactions
- Gentle gestures and expressions
- Voice-based challenges
- Building comfort and trust

#### 🟠 Hot (Intermediate)
- Sensual challenges with moderate intensity
- Strip tease elements
- Silhouette and lighting play
- Deeper emotional connection

#### 🔥 Spicy (Advanced)
- Intimate challenges for experienced players
- Erotic narration and roleplay
- Advanced camera work
- Maximum intensity interactions

### Card System

Each game card contains:
- **Teaser**: Vague hint for the observing partner
- **Private Instruction**: Specific task for the performing partner
- **Duration**: Time limit for the challenge
- **Category**: Type of interaction (Voice, Gesture, Strip Tease, etc.)

### Custom Cards

Players can create, edit, and share their own custom cards:
- Personal card library
- Import/export functionality
- Category tagging
- Privacy controls

## 🛡️ Safety & Consent

### Multi-Step Verification
1. **Age Verification**: 18+ confirmation required
2. **Mutual Consent**: Both parties must agree to participate
3. **Intensity Selection**: Agreed-upon comfort level
4. **Safety Briefing**: Safeword system explanation
5. **Privacy Agreement**: No recording policy
6. **Boundary Acknowledgment**: Respect for limits

### Emergency Features
- **Safeword System**: "STOP" immediately pauses all activity
- **Emergency Stop Button**: Always-visible safety control
- **Auto-Pause**: Automatic suspension on connection loss
- **Content Warnings**: Clear boundaries and expectations

### Privacy Protection
- End-to-end encrypted video streams
- No recording or screenshot capabilities
- Secure room codes and authentication
- Data retention policies

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- Modern web browser with WebRTC support
- Stable internet connection

### Installation

#### Option 1: Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/yourusername/strip-in-the-dark.git
cd strip-in-the-dark

# Start with Docker Compose
docker-compose up -d

# Access the application
open http://localhost:3000
```

#### Option 2: Manual Installation
```bash
# Backend setup
cd backend
npm install
npm start

# Frontend setup (new terminal)
cd ..
npm install
npm start
```

### First Time Setup
1. Create a room or join an existing one
2. Complete the consent verification process
3. Select your preferred intensity level
4. Invite your partner using the room code
5. Begin your intimate adventure

## 🎮 How to Play

### Creating a Room
1. Click "Create Room" from the lobby
2. Choose a room name and intensity level
3. Set privacy options (optional)
4. Create custom cards (optional)
5. Share the room code with your partner

### Game Flow
1. **Lobby**: Wait for both players to join
2. **Consent**: Complete safety verification
3. **Game Start**: AI supervisor begins rounds
4. **Card Drawing**: Private instructions revealed
5. **Action Phase**: Live performance via webcam
6. **Completion**: AI evaluates and continues

### Using Custom Cards
1. Navigate to "Custom Cards" section
2. Click "Create Card"
3. Fill in title, teaser, and instructions
4. Select intensity level and category
5. Save to your personal library

## 🛠️ Technical Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom themes
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with Express
- **Real-time**: Socket.IO
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Authentication**: JWT-based sessions

### Communication
- **Video/Audio**: WebRTC with STUN/TURN servers
- **Signaling**: Socket.IO WebSocket
- **Data Channel**: Game state synchronization
- **Encryption**: End-to-end encryption

### AI System
- **Supervisor AI**: Game flow management
- **Player Bots**: Individual assistance
- **Narrative Engine**: Context-aware messaging
- **Safety Monitoring**: Distress detection

## 🚀 Quick Deploy to Vercel

Aplikacja jest gotowa do wdrożenia na Vercel!

### Szybkie wdrożenie:

1. **Backend (Railway)**: 
   - Railway.app → Deploy folder `backend/`
   - Dodaj zmienne: `PORT=3001`, `FRONTEND_URL=twoja-aplikacja.vercel.app`

2. **Frontend (Vercel)**:
   - Vercel.com → Deploy z GitHub
   - Dodaj zmienną: `REACT_APP_BACKEND_URL=https://app.railway.app`

📖 **Pełne instrukcje**: Zobacz `DEPLOY.md` lub `README_VERCEL.md`

⚠️ **Uwaga**: Socket.IO wymaga osobnego serwisu (Railway/Render). Frontend może być na Vercel.

## 🔧 Configuration

### Environment Variables
```env
# Backend
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com
SESSION_SECRET=your-session-secret
JWT_SECRET=your-jwt-secret

# Frontend
REACT_APP_BACKEND_URL=https://yourdomain.com
REACT_APP_WS_URL=wss://yourdomain.com
```

### SSL Configuration
Required for WebRTC:
```nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    # ... other configuration
}
```

## 📱 Mobile Support

### Responsive Design
- Mobile-first approach
- Touch-optimized controls
- Adaptive layouts
- Swipe navigation

### Mobile Features
- Portrait and landscape modes
- Simplified UI for small screens
- Touch-friendly buttons
- Optimized video quality

## 🎨 Customization

### Theming
- Custom color schemes
- Font customization
- Animation preferences
- Accessibility options

### Game Settings
- Video quality adjustment
- Audio preferences
- Notification settings
- Privacy controls

## 🔐 Security Features

### Data Protection
- No persistent storage of sensitive data
- Encrypted communications
- Secure authentication
- Regular security audits

### Content Safety
- Automated content filtering
- User reporting system
- Moderation tools
- Community guidelines

## 📊 Monitoring & Analytics

### Performance Metrics
- Connection quality monitoring
- Error tracking
- Usage analytics
- Performance optimization

### Health Checks
- Service availability
- WebSocket connectivity
- Video stream quality
- Server resource usage

## 🤝 Contributing

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Git hooks for quality control

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Legal Notice

**Age Restriction**: This application is intended for adults aged 18 and older. By using this software, you confirm that you meet the age requirements and consent to participate in adult content.

**Content Warning**: This application contains adult themes and sexual content. User discretion is advised.

**Privacy Notice**: All communications are encrypted and no content is stored on our servers. Please review our privacy policy for detailed information.

## 🆘 Support

### Documentation
- [Installation Guide](INSTALLATION.md)
- [Deployment Guide](DEPLOYMENT.md)
- [API Documentation](API.md)
- [Troubleshooting](TROUBLESHOOTING.md)

### Community
- GitHub Issues: Report bugs and request features
- Discussions: Community forum for questions
- Wiki: Additional documentation and guides

### Contact
- Email: support@stripinthedark.com
- Discord: Community server (18+ only)
- Twitter: @StripInTheDark

## 🙏 Acknowledgments

### Technical
- WebRTC team for real-time communication
- Socket.IO for WebSocket management
- React team for the frontend framework
- Tailwind CSS for styling utilities

### Inspiration
- Long-distance relationship communities
- Adult entertainment industry pioneers
- Privacy and security advocates
- Open-source contributors

## 📈 Roadmap

### Version 1.1 (Coming Soon)
- [ ] Mobile app (React Native)
- [ ] Voice masking features
- [ ] Advanced AI personalities
- [ ] Party mode (multiple couples)
- [ ] VR support

### Version 1.2 (Planned)
- [ ] Recording studio mode
- [ ] AI-generated custom cards
- [ ] Advanced privacy controls
- [ ] Integration with smart toys
- [ ] Multi-language support

### Long Term Vision
- [ ] Blockchain-based privacy
- [ ] Decentralized hosting
- [ ] AI relationship coaching
- [ ] Community features
- [ ] Educational content

---

**Strip in the Dark – TENSIONS Online Spicy Edition** 

*Where intimacy meets technology in the most exciting way possible.*

---

<div align="center">
  <sub>Built with ❤️ for couples who dare to explore</sub>
  <br>
  <sub><strong>18+ Only • Consent First • Privacy Always</strong></sub>
</div>