# ⚡ VERCEL - Szybki Deploy (5 minut)

## 🚀 Krok po Kroku

### 1️⃣ Vercel.com → New Project
- Zaloguj się przez GitHub
- Kliknij "Add New..." → "Project"
- Wybierz swoje repozytorium
- Kliknij "Import"

### 2️⃣ Konfiguracja (automatyczna)
- Framework: Create React App ✅
- Root Directory: `.` ✅  
- Build Command: `npm run build` ✅
- Output Directory: `build` ✅

### 3️⃣ Environment Variables
Kliknij "Environment Variables" → "Add":

```
Name: REACT_APP_BACKEND_URL
Value: https://xxx.up.railway.app
```

⚠️ **Wstaw URL backendu z Railway!**

### 4️⃣ Deploy
- Kliknij "Deploy"
- Czekaj 2-3 minuty
- Gotowe! 🎉

### 5️⃣ Test
- Otwórz URL z Vercel
- Aplikacja powinna działać!

---

## 🔗 Połącz z Backendem

Jeśli backend już jest na Railway:

**W Vercel:**
```
Settings → Environment Variables
REACT_APP_BACKEND_URL = https://xxx.up.railway.app
```

**W Railway:**
```
Settings → Variables  
FRONTEND_URL = https://xxx.vercel.app
```

---

## ✅ Checklist

- [ ] Projekt w Vercel utworzony
- [ ] `REACT_APP_BACKEND_URL` ustawiony
- [ ] Deploy zakończony
- [ ] Aplikacja działa

---

## 🎯 Pełna instrukcja

Zobacz: `WDROZ_NA_VERCEL.md`

