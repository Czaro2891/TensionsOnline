# 🚀 Wdrożenie Backendu na Render.com

## ✅ Najlepsza alternatywa dla Railway!

Render.com oferuje:
- ✅ Darmowy plan
- ✅ Obsługę WebSocket/Socket.IO
- ✅ Automatyczne wdrażanie z GitHub
- ✅ Darmowy SSL
- ✅ Automatyczne restartowanie

---

## 📋 KROK PO KROKU:

### 1️⃣ Utwórz konto na Render

1. **Otwórz:** https://render.com
2. **Kliknij:** "Get Started for Free"
3. **Zaloguj się** przez GitHub (najłatwiej)
4. **Potwierdź** email jeśli trzeba

---

### 2️⃣ Utwórz nowy Web Service

1. W dashboard kliknij: **"New +"**
2. Wybierz: **"Web Service"**
3. **Kliknij:** "Connect GitHub"
4. **Wybierz repozytorium:** `Czaro2891/TensionsOnline`
5. **Kliknij:** "Connect"

---

### 3️⃣ Skonfiguruj serwis

Wypełnij formularz:

**Name:**
```
strip-in-the-dark-backend
```

**Region:**
```
Frankfurt (najbliżej Polski)
```
lub wybierz najbliższy region

**Branch:**
```
main
```

**Root Directory:**
```
backend
```
⚠️ **BARDZO WAŻNE!**

**Runtime:**
```
Node
```
Render automatycznie wykryje Node.js

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

---

### 4️⃣ Dodaj zmienne środowiskowe

Scrolluj w dół do sekcji **"Environment Variables"**

**Kliknij:** "Add Environment Variable"

Dodaj 3 zmienne (jedna po drugiej):

**Zmienna 1:**
```
Key: PORT
Value: 3001
```

**Zmienna 2:**
```
Key: NODE_ENV
Value: production
```

**Zmienna 3:**
```
Key: FRONTEND_URL
Value: https://strip-in-the-dark.vercel.app
```

---

### 5️⃣ Wybierz plan

**Wybierz:** 
- **"Free"** (darmowy plan)

⚠️ **Uwaga:** Darmowy plan ma ograniczenia:
- Serwis "śpi" po 15 min nieaktywności
- Pierwsze uruchomienie może trwać 30-60 sekund

**Dla produkcji lepiej:** Starter plan ($7/miesiąc)

---

### 6️⃣ Wdróż!

1. **Scrolluj w dół**
2. **Kliknij:** "Create Web Service"
3. **Czekaj** na zakończenie buildu (2-5 minut)
4. Render automatycznie przypisze URL (np. `https://xxx.onrender.com`)

---

### 7️⃣ Sprawdź czy działa

Otwórz w przeglądarce:
```
https://xxx.onrender.com/api/health
```

Powinieneś zobaczyć:
```json
{"status":"OK","timestamp":"..."}
```

**Jeśli działa - SUKCES!** 🎉

---

## 🔧 Konfiguracja po wdrożeniu

### Sprawdź logi:
1. W panelu Render kliknij: **"Logs"**
2. Zobaczysz output serwera w czasie rzeczywistym

### Sprawdź status:
- **Status:** "Live" = działa ✅
- **Status:** "Sleeping" = śpi (darmowy plan) - obudzi się przy pierwszym zapytaniu

---

## 🔗 Co dalej?

### Zaktualizuj Frontend (Vercel):

1. Otwórz: https://vercel.com/cezars-projects-c10d5116/strip-in-the-dark/settings/environment-variables
2. Znajdź: `REACT_APP_BACKEND_URL`
3. Edytuj i wpisz: URL z Render (np. `https://xxx.onrender.com`)
4. Zapisz
5. Vercel automatycznie zredeployuje

---

## ⚠️ Ważne uwagi

### Darmowy plan Render:
- ✅ Działa świetnie do testowania
- ⚠️ Serwis "śpi" po 15 min nieaktywności
- ⚠️ Pierwsze uruchomienie po śnie: 30-60 sekund
- ⚠️ Limity: 750 godzin/miesiąc

### Dla produkcji:
- Rozważ plan Starter ($7/miesiąc) - bez "spania"
- Lepsza wydajność
- Szybsze uruchomienie

---

## ✅ Checklist

- [ ] Konto na Render utworzone
- [ ] Web Service utworzony
- [ ] Root Directory = `backend`
- [ ] PORT = 3001 (zmienna)
- [ ] NODE_ENV = production (zmienna)
- [ ] FRONTEND_URL = https://strip-in-the-dark.vercel.app (zmienna)
- [ ] Service wdrożony
- [ ] `/api/health` działa
- [ ] Frontend zaktualizowany z URL backendu

---

## 🎉 Gotowe!

Twój backend jest teraz na Render.com! 🚀

**Panel Render:** https://dashboard.render.com

---

## 📞 Szybkie linki:

- **Render Dashboard:** https://dashboard.render.com
- **Panel Vercel:** https://vercel.com/cezars-projects-c10d5116/strip-in-the-dark
- **GitHub Repo:** https://github.com/Czaro2891/TensionsOnline

