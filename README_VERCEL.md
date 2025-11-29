# 🚀 Wdrożenie na Vercel - Szybki Start

## ⚠️ WAŻNE: Socket.IO i Vercel

Aplikacja używa **Socket.IO** do komunikacji WebRTC. Vercel Serverless Functions **nie obsługują** długotrwałych połączeń WebSocket wymaganych przez Socket.IO.

## ✅ Rekomendowane rozwiązanie

**Hybrid Architecture:**
- ✅ **Frontend** → Vercel (darmowy plan)
- ✅ **Backend z Socket.IO** → Railway/Render (tani plan)

## 📋 Krok po kroku

### 1️⃣ Backend na Railway (5 min)

1. Przejdź na https://railway.app
2. Kliknij "New Project" → "Deploy from GitHub repo"
3. Wybierz repozytorium i folder `backend/`
4. Railway automatycznie wykryje Node.js
5. W ustawieniach projektu dodaj zmienne środowiskowe:

```env
PORT=3001
FRONTEND_URL=https://twoja-aplikacja.vercel.app
NODE_ENV=production
```

6. Railway przypisze URL (np. `https://your-app.railway.app`)
7. **Skopiuj ten URL** - będzie potrzebny w kroku 2

### 2️⃣ Frontend na Vercel (3 min)

#### Opcja A: Przez GitHub (Rekomendowane)

1. Wrzuć kod na GitHub
2. Przejdź na https://vercel.com
3. Kliknij "New Project"
4. Połącz repozytorium GitHub
5. Vercel automatycznie wykryje React
6. W ustawieniach Build:
   - **Framework Preset**: Create React App
   - **Root Directory**: `/` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

7. Dodaj zmienną środowiskową:
   ```
   REACT_APP_BACKEND_URL=https://your-app.railway.app
   ```

8. Kliknij "Deploy"

#### Opcja B: Przez Vercel CLI

```bash
# Zainstaluj Vercel CLI
npm i -g vercel

# Zaloguj się
vercel login

# Wdróż
vercel

# Wdróż do produkcji
vercel --prod
```

### 3️⃣ Aktualizacja URL backendu w backendzie

1. W panelu Railway, znajdź URL swojego backendu
2. Wróć do Vercel → Settings → Environment Variables
3. Zaktualizuj `REACT_APP_BACKEND_URL` z URL Railway
4. Redeploy aplikacji w Vercel

### 4️⃣ Gotowe! 🎉

Twoja aplikacja powinna działać:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.railway.app`

## 🔧 Struktura plików dla Vercel

```
/
├── api/                  # Vercel Serverless Functions (opcjonalne)
│   └── server.js        # Proste API endpoints bez Socket.IO
├── src/                  # Frontend React
├── public/               # Statyczne pliki
├── backend/              # Backend z Socket.IO (hostowany na Railway)
│   └── server.js
├── vercel.json           # Konfiguracja Vercel
└── package.json          # Frontend dependencies
```

## 💰 Koszty

- **Vercel**: ✅ Darmowy plan wystarczy
- **Railway**: $5/miesiąc (lub darmowy trial)

## 🐛 Troubleshooting

### Problem: CORS errors
```env
# W Railway, ustaw:
FRONTEND_URL=https://your-app.vercel.app
```

### Problem: Socket.IO nie łączy się
- Sprawdź czy backend działa: `https://your-app.railway.app/api/health`
- Sprawdź `REACT_APP_BACKEND_URL` w Vercel
- Upewnij się że oba serwisy używają HTTPS

### Problem: WebRTC nie działa
- WebRTC wymaga HTTPS (Vercel i Railway to zapewniają)
- Sprawdź uprawnienia kamery/mikrofonu w przeglądarce

## 📝 Alternatywne hostowanie backendu

Jeśli nie chcesz używać Railway:

### Render.com
1. Utwórz Web Service
2. Root Directory: `backend/`
3. Build: `npm install`
4. Start: `npm start`

### Heroku
1. Utwórz app
2. Połącz z GitHub
3. Ustaw root: `backend/`
4. Deploy

### DigitalOcean App Platform
1. Utwórz App
2. Wybierz folder `backend/`
3. Deploy

## 🎯 Quick Commands

```bash
# Local development
npm start                    # Frontend
cd backend && npm start      # Backend

# Deploy to Vercel
vercel --prod

# Check deployment
vercel logs
```

## 📚 Dodatkowe zasoby

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Socket.IO Deployment](https://socket.io/docs/v4/production-checklist/)

