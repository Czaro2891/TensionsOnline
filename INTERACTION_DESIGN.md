# Strip in the Dark – Interaction Design

## Game Flow Architecture

### 1. Entry & Lobby System
**Primary Interface**: Split-screen lobby with room creation/join options
- **Left Panel**: Room creation with intensity selection
- **Right Panel**: Room joining with code entry
- **Center**: Live preview of available rooms and player counts
- **Safety Banner**: Prominent consent and safety information

### 2. Consent & Verification Flow
**Multi-step verification process**:
1. **Age Verification**: Both players confirm 18+ status
2. **Mutual Consent**: Agreement to game terms and boundaries
3. **Intensity Selection**: Soft/Hot/Spicy level agreement
4. **Safety Briefing**: Safeword explanation and emergency procedures
5. **Final Confirmation**: Both players must actively consent

### 3. Game Interface Layout
**Three-panel layout during gameplay**:
- **Left Panel (30%)**: Private instruction display
  - Current card details
  - Timer countdown
  - AI assistant feedback
- **Center Panel (50%)**: Video communication area
  - Partner's video stream
  - Your video preview (smaller)
  - Visual effects and overlays
- **Right Panel (20%)**: Game controls
  - Safeword button
  - Pause/Resume
  - Settings
  - Card history

### 4. Card Interaction System
**Dynamic card drawing mechanism**:
- **AI Supervisor**: Selects performer, observer, and card
- **Private Instructions**: Only visible to performing player
- **Teaser Display**: Shown to observing player
- **Progressive Reveal**: Cards appear with smooth animations
- **Category Filtering**: Based on selected intensity level

### 5. Real-time Communication
**WebRTC Integration**:
- **Video Streams**: High-quality, low-latency communication
- **Audio Channels**: Clear voice communication
- **Data Channel**: For game state synchronization
- **Screen Sharing**: Optional for certain card types
- **Connection Status**: Real-time connectivity monitoring

### 6. Custom Card Management
**Integrated card creation system**:
- **Card Builder**: Form-based card creation
- **Preview Mode**: Test card before saving
- **Category Management**: Organize by type and intensity
- **Sharing System**: Import/export card collections
- **Moderation**: Community guidelines enforcement

### 7. Safety & Emergency Features
**Always-accessible safety controls**:
- **Safeword Button**: Large, prominent emergency stop
- **Pause Function**: Immediate game suspension
- **Disconnect Protection**: Auto-pause on connection loss
- **Content Warnings**: Pre-task boundary reminders
- **Aftercare Mode**: Post-game emotional support

### 8. AI Assistant Integration
**Dual-bot system**:
- **Supervisor AI**: Manages game flow and pacing
- **Player Assistants**: Private guidance and encouragement
- **Safety Monitoring**: Detects distress or discomfort
- **Adaptive Pacing**: Adjusts based on player responses
- **Narrative Voice**: Sensual, teasing commentary

## User Interaction Patterns

### Navigation Flow
1. **Landing Page** → **Room Selection**
2. **Room Creation/Joint** → **Consent Process**
3. **Game Setup** → **Live Gameplay**
4. **Game Completion** → **Aftercare/Feedback**

### Interaction Loops
- **Card Drawing**: AI selects → Players receive instructions → Action performed → Feedback given
- **Safety Monitoring**: Continuous background checking → Immediate response if triggered
- **Communication**: Video/audio streams → Real-time reactions → Adaptive content

### Mobile Responsiveness
- **Portrait Mode**: Stacked panels with swipe navigation
- **Landscape Mode**: Side-by-side layout similar to desktop
- **Touch Controls**: Large, accessible buttons for safety features
- **Simplified UI**: Essential elements only on smaller screens

## Accessibility Features
- **Keyboard Navigation**: Full game control without mouse
- **Screen Reader Support**: ARIA labels and descriptions
- **High Contrast Mode**: Enhanced visibility options
- **Text Scaling**: Adjustable font sizes
- **Audio Cues**: Sound notifications for important events