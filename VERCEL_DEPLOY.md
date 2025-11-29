# Wdrożenie na Vercel

## Ważne informacje

Aplikacja używa **Socket.IO** dla WebRTC signaling, które wymaga długotrwałych połączeń WebSocket. Vercel Serverless Functions mają ograniczenia czasowe i nie obsługują dobrze długotrwałych połączeń.

## Zalecana architektura

### Opcja 1: Hybrid (Rekomendowane)
- **Frontend**: Vercel (statyczny build)
- **Backend z Socket.IO**: Osobny serwis (Railway, Render, Heroku, DigitalOcean)

### Opcja 2: Wszystko na Vercel
- **Frontend**: Vercel
- **API endpoints**: Vercel Serverless Functions (bez Socket.IO)
- **Socket.IO**: Wymaga zewnętrznego serwisu

## Kroki wdrożenia

### 1. Przygotowanie frontendu na Vercel

```bash
# Zainstaluj Vercel CLI
npm i -g vercel

# Zaloguj się
vercel login

# Wdróż aplikację
vercel
```

### 2. Konfiguracja zmiennych środowiskowych w Vercel

W panelu Vercel ustaw następujące zmienne środowiskowe:

```
REACT_APP_BACKEND_URL=https://twoj-backend-url.railway.app
NODE_ENV=production
```

### 3. Wdrożenie backendu na Railway (lub Render)

#### Railway (Rekomendowane):

1. Przejdź na [Railway.app](https://railway.app)
2. Utwórz nowy projekt
3. Połącz repozytorium GitHub
4. Wybierz folder `backend/`
5. Railway automatycznie wykryje Node.js i uruchomi backend
6. Ustaw zmienne środowiskowe:
   - `PORT=3001`
   - `FRONTEND_URL=https://twoja-aplikacja.vercel.app`
   - `NODE_ENV=production`
7. Railway przypisze URL - użyj go w `REACT_APP_BACKEND_URL` w Vercel

#### Render:

1. Przejdź na [Render.com](https://render.com)
2. Utwórz nowy Web Service
3. Połącz repozytorium GitHub
4. Konfiguracja:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Ustaw zmienne środowiskowe (jak powyżej)

### 4. Aktualizacja frontendu

Upewnij się, że frontend używa zmiennej środowiskowej:

```typescript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
```

## Alternatywa: Pełna konfiguracja Vercel

Jeśli chcesz użyć tylko Vercel (bez Socket.IO), możesz:

1. Użyć API routes dla REST endpoints
2. Dla WebRTC signaling użyć alternatywnego rozwiązania (PeerJS, WebRTC native)
3. Lub użyć zewnętrznego serwisu tylko dla Socket.IO

## Struktura projektu

```
/
├── api/              # Vercel Serverless Functions (opcjonalne)
│   └── server.js
├── src/              # Frontend React app
├── public/           # Statyczne pliki
├── backend/          # Backend z Socket.IO (hostowany osobno)
│   └── server.js
├── vercel.json       # Konfiguracja Vercel
└── package.json      # Frontend dependencies
```

## Build i wdrożenie

### Lokalne testowanie

```bash
# Frontend
npm run build
npm start

# Backend (osobny terminal)
cd backend
npm start
```

### Wdrożenie na Vercel

```bash
# Automatyczne wdrożenie przez Git
git push origin main

# Lub ręczne wdrożenie
vercel --prod
```

## Troubleshooting

### Problem: Socket.IO nie działa
- **Rozwiązanie**: Backend z Socket.IO musi być na osobnym serwisie (Railway, Render)

### Problem: CORS errors
- **Rozwiązanie**: Ustaw `FRONTEND_URL` w backendzie na URL Vercel

### Problem: WebRTC nie działa
- **Rozwiązanie**: Sprawdź STUN/TURN servers i HTTPS (wymagane dla WebRTC)

## Monitoring

- **Vercel Analytics**: Automatycznie włączone w projekcie
- **Backend logs**: Sprawdź w panelu Railway/Render
- **WebRTC stats**: Użyj `RTCPeerConnection.getStats()`

## Koszty

- **Vercel**: Darmowy plan wystarcza dla frontendu
- **Railway**: $5/miesiąc za podstawowy plan
- **Render**: Darmowy plan dostępny (z ograniczeniami)

