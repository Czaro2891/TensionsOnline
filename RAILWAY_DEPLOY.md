# 🚂 Wdrożenie Backendu na Railway - Krok po Kroku

## ⚡ Szybki Start (5 minut)

### Krok 1: Przygotowanie GitHub

1. **Upewnij się**, że kod jest na GitHub:
   ```bash
   git add .
   git commit -m "Ready for Railway deployment"
   git push origin main
   ```

### Krok 2: Railway Setup

1. **Otwórz**: https://railway.app
2. **Zaloguj się** przez GitHub
3. **Kliknij**: "New Project"
4. **Wybierz**: "Deploy from GitHub repo"
5. **Wybierz** swoje repozytorium
6. **Kliknij**: "Deploy Now"

### Krok 3: Konfiguracja

1. **Kliknij** na swój projekt
2. **Kliknij** na serwis (service)
3. **Kliknij**: "Settings" → "Root Directory"
4. **Ustaw**: `backend`
5. **Zapisz**

### Krok 4: Zmienne Środowiskowe

1. **Kliknij**: "Variables"
2. **Dodaj** następujące zmienne:

```
PORT = 3001
NODE_ENV = production
FRONTEND_URL = (zostaw puste na razie, dodasz później)
```

3. **Zapisz**

### Krok 5: Generowanie Domeny

1. **Kliknij**: "Settings"
2. **Kliknij**: "Generate Domain"
3. **Skopiuj URL** (np. `https://xxx.railway.app`)
4. **To jest URL twojego backendu!** ✅

### Krok 6: Test

1. Otwórz w przeglądarce: `https://xxx.railway.app/api/health`
2. Powinieneś zobaczyć: `{"status":"OK","timestamp":"..."}`
3. **Jeśli działa - sukces!** 🎉

---

## 🔧 Zaawansowane Ustawienia

### Port Configuration

Railway automatycznie ustawia port przez zmienną `PORT`. Backend jest już skonfigurowany do użycia `process.env.PORT || 3001`.

### Logs

Aby zobaczyć logi:
1. Kliknij na serwis
2. Kliknij zakładkę "Logs"
3. Zobaczysz logi w czasie rzeczywistym

### Restart

Aby zrestartować:
1. Kliknij na serwis
2. Kliknij "..." (menu)
3. Wybierz "Restart"

---

## 🐛 Troubleshooting

### Problem: Build failed
- Sprawdź czy `backend/package.json` istnieje
- Sprawdź czy `backend/server.js` istnieje
- Sprawdź logi w Railway

### Problem: Port already in use
- Railway automatycznie ustawia port - nie zmieniaj `PORT` w kodzie
- Użyj `process.env.PORT` (już jest w kodzie)

### Problem: Cannot find module
- Sprawdź czy wszystkie zależności są w `package.json`
- Railway automatycznie uruchomi `npm install`

### Problem: CORS errors
- Ustaw `FRONTEND_URL` w zmiennych środowiskowych
- URL musi być pełny (z `https://`)

---

## 📝 Checklist Przed Deployem

- [ ] Kod jest na GitHub
- [ ] `backend/package.json` istnieje
- [ ] `backend/server.js` istnieje
- [ ] Wszystkie zależności są w `package.json`
- [ ] Port używa `process.env.PORT` (już jest ✅)

---

## 🎯 Po Wdrożeniu

1. **Skopiuj URL** z Railway
2. **Użyj go** w Vercel jako `REACT_APP_BACKEND_URL`
3. **Dodaj URL Vercel** do Railway jako `FRONTEND_URL`
4. **Redeploy** backendu

---

## 💰 Koszty

- **Railway**: $5/miesiąc (lub darmowy trial)
- **Darmowy trial**: 500 godzin/miesiąc

---

## 📚 Przydatne Linki

- [Railway Docs](https://docs.railway.app)
- [Railway Dashboard](https://railway.app/dashboard)
- [Railway Status](https://status.railway.app)

