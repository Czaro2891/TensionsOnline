# 🚀 Wdrożenie na Vercel - Krótki Przewodnik

> **💡 Najprostsza instrukcja**: Zobacz `PROSTE_WDROZENIE.md` - tylko 3 kroki!

## ⚡ Szybkie wdrożenie (2 kroki)

### Krok 1: Backend na Railway (Socket.IO)

1. **Railway.app** → "New Project" → "Deploy from GitHub"
2. Wybierz folder `backend/`
3. Dodaj zmienne środowiskowe:
   ```
   PORT=3001
   FRONTEND_URL=https://twoja-aplikacja.vercel.app
   NODE_ENV=production
   ```
4. Skopiuj URL (np. `https://app.railway.app`)

### Krok 2: Frontend na Vercel

1. **Vercel.com** → "New Project" → Połącz GitHub
2. Framework: Create React App
3. Dodaj zmienną środowiskową:
   ```
   REACT_APP_BACKEND_URL=https://app.railway.app
   ```
4. Deploy!

## 📝 Szczegółowe instrukcje

Zobacz `README_VERCEL.md` dla pełnych instrukcji.

## ⚠️ Ważne

- Socket.IO **nie działa** z Vercel Serverless Functions
- Backend z Socket.IO musi być na osobnym serwisie (Railway, Render, etc.)
- Frontend może być na Vercel (darmowy plan)

## 🎯 Struktura po wdrożeniu

```
Frontend (Vercel)  →  Backend z Socket.IO (Railway)
   ↓                        ↓
https://app.vercel.app  →  https://app.railway.app
```

## 💰 Koszty

- Vercel: ✅ Darmowy
- Railway: $5/miesiąc

