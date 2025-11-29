# 🚂 Wdrożenie na Railway - NAJPROŚCIEJ

## Twój projekt Railway: `621f114b-60ab-44f2-a3b8-6999ad9c847b`

---

## 📋 KROK PO KROKU (5 minut):

### 1️⃣ Otwórz projekt w Railway

**Link bezpośredni:**
https://railway.app/project/621f114b-60ab-44f2-a3b8-6999ad9c847b

Lub:
1. Otwórz: https://railway.app
2. Kliknij na swój projekt

---

### 2️⃣ Połącz z GitHub (jeśli jeszcze nie)

1. W lewym menu kliknij: **"Settings"** (⚙️)
2. Scrolluj w dół do **"Source"**
3. Kliknij: **"Connect GitHub Repo"**
4. Wybierz repozytorium: `Czaro2891/TensionsOnline`
5. Branch: `main`
6. **Root Directory**: `backend` ← **WAŻNE!**
7. Kliknij: **"Connect"**

**Railway automatycznie rozpocznie wdrożenie!**

---

### 3️⃣ Ustaw Root Directory (jeśli nie było w kroku 2)

1. **Settings** (⚙️) → **"Service Settings"**
2. Znajdź: **"Root Directory"**
3. Wpisz: `backend`
4. Zapisz (Railway zrestartuje)

---

### 4️⃣ Dodaj zmienne środowiskowe

1. W lewym menu kliknij: **"Variables"**
2. Kliknij: **"New Variable"**

Dodaj te 3 zmienne (jedna po drugiej):

**Zmienna 1:**
```
Name: PORT
Value: 3001
```

**Zmienna 2:**
```
Name: NODE_ENV
Value: production
```

**Zmienna 3:**
```
Name: FRONTEND_URL
Value: https://strip-in-the-dark.vercel.app
```

3. **Zapisz** każdą zmienną

---

### 5️⃣ Wygeneruj domenę (jeśli jeszcze nie masz)

1. **Settings** (⚙️) → **"Domains"**
2. Kliknij: **"Generate Domain"**
3. Skopiuj URL (np. `https://xxx.up.railway.app`)
4. **To jest URL twojego backendu!** ✅

---

### 6️⃣ Sprawdź czy działa

Otwórz w przeglądarce:
```
https://xxx.up.railway.app/api/health
```

Powinieneś zobaczyć:
```json
{"status":"OK","timestamp":"..."}
```

**Jeśli działa - SUKCES!** 🎉

---

## 📊 Monitoruj wdrożenie

1. Kliknij: **"Deployments"** (w lewym menu)
2. Zobaczysz status buildu
3. Po zakończeniu status zmieni się na **"Success"** ✅

**Logi:**
- Kliknij: **"Logs"** (w lewym menu)
- Zobaczysz output serwera w czasie rzeczywistym

---

## 🔗 Co dalej?

### Zaktualizuj FRONTEND_URL w Railway

Jeśli zmienił się URL frontendu z Vercel:
1. **Variables** → znajdź `FRONTEND_URL`
2. Kliknij ✏️ (edycja)
3. Wpisz nowy URL z Vercel
4. Zapisz (Railway zrestartuje automatycznie)

### Zaktualizuj REACT_APP_BACKEND_URL w Vercel

Jeśli zmienił się URL backendu z Railway:
1. Otwórz: https://vercel.com/cezars-projects-c10d5116/strip-in-the-dark/settings/environment-variables
2. Znajdź: `REACT_APP_BACKEND_URL`
3. Wpisz nowy URL z Railway
4. Redeploy w Vercel

---

## ❓ Problemy?

### Build się nie powiódł?
- Sprawdź **Logs** w Railway
- Sprawdź czy Root Directory = `backend`
- Sprawdź czy `package.json` jest w folderze `backend/`

### Serwer się nie uruchamia?
- Sprawdź czy PORT jest ustawiony (Railway automatycznie ustawia, ale możesz ustawić 3001)
- Sprawdź logi - może być błąd w kodzie

### Nie można połączyć się z frontendem?
- Sprawdź czy `FRONTEND_URL` jest ustawiony w Railway
- Sprawdź czy `REACT_APP_BACKEND_URL` jest ustawiony w Vercel
- Sprawdź CORS w `backend/server.js` (powinien używać `process.env.FRONTEND_URL`)

---

## ✅ Checklist

- [ ] Projekt otwarty w Railway
- [ ] Połączony z GitHub (`Czaro2891/TensionsOnline`)
- [ ] Root Directory = `backend`
- [ ] PORT = 3001 (zmienna)
- [ ] NODE_ENV = production (zmienna)
- [ ] FRONTEND_URL = https://strip-in-the-dark.vercel.app (zmienna)
- [ ] Domain wygenerowany
- [ ] `/api/health` działa

---

## 🎉 Gotowe!

Twój backend jest teraz na Railway! 🚂

**URL Backendu:** `https://xxx.up.railway.app`

**URL Frontendu:** `https://strip-in-the-dark.vercel.app`

---

## 🔗 Szybkie linki:

- **Panel Railway:** https://railway.app/project/621f114b-60ab-44f2-a3b8-6999ad9c847b
- **Panel Vercel:** https://vercel.com/cezars-projects-c10d5116/strip-in-the-dark
- **GitHub Repo:** https://github.com/Czaro2891/TensionsOnline

