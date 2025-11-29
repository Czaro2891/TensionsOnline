# Strip in the Dark – TENSIONS Online Spicy Edition
## Game Architecture Document

### Overview
A two-player online adult game designed for remote couples, featuring card-based spicy challenges with multiple intensity levels, real-time video communication, and comprehensive safety features.

### Core Components

#### 1. Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom spicy theme
- **State Management**: Zustand for game state
- **Video/Audio**: WebRTC with Socket.IO signaling
- **Routing**: React Router v6

#### 2. Backend Architecture
- **Runtime**: Node.js with Express
- **Real-time**: Socket.IO for WebSocket communication
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based session management
- **File Storage**: Local JSON for custom cards

#### 3. Game Flow
1. **Lobby Creation**: Player creates/joins room
2. **Consent Verification**: Adult confirmation & mutual consent
3. **Intensity Selection**: Soft/Hot/Spicy level agreement
4. **Game Start**: AI supervisor initiates rounds
5. **Card Drawing**: Private instructions revealed
6. **Action Phase**: Live performance via webcam
7. **Round Completion**: AI evaluates and continues

#### 4. Safety Systems
- **Consent Management**: Multi-step verification
- **Safeword Integration**: Instant pause functionality
- **Auto-Timeout**: Automatic pause on disconnect
- **Content Filtering**: AI-powered boundary enforcement
- **Emergency Stop**: Immediate session termination

### Technical Specifications

#### Database Schema
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    is_adult BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Game sessions
CREATE TABLE game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_code VARCHAR(6) UNIQUE NOT NULL,
    player1_id UUID REFERENCES users(id),
    player2_id UUID REFERENCES users(id),
    intensity_level VARCHAR(10) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Custom cards
CREATE TABLE custom_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(100) NOT NULL,
    teaser TEXT NOT NULL,
    instruction TEXT NOT NULL,
    level VARCHAR(10) NOT NULL,
    category VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### API Endpoints
- `POST /api/rooms/create` - Create game room
- `POST /api/rooms/join` - Join existing room
- `POST /api/consent/verify` - Verify adult consent
- `GET /api/cards/default` - Get default card deck
- `CRUD /api/cards/custom` - Manage custom cards
- `POST /api/game/start` - Start game session
- `POST /api/game/pause` - Emergency pause

#### WebSocket Events
- `room:join` - Player joins room
- `consent:update` - Consent status changes
- `game:start` - Game initialization
- `card:draw` - New card drawn
- `action:complete` - Action finished
- `safety:trigger` - Safeword activated

### Security Considerations
- No recording or screenshot capabilities
- Encrypted video streams
- Secure room codes
- Session timeout management
- Adult content warnings

### Deployment
- Docker containerization
- Environment-based configuration
- HTTPS with SSL certificates
- CDN for static assets
- Load balancing for multiple rooms