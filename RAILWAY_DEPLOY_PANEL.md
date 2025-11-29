# 🚂 Wdrożenie na Railway - Przez Panel

## ✅ Projekt połączony przez CLI!

**Projekt:** happy-courtesy  
**Service:** TensionsOnline  
**ID:** 621f114b-60ab-44f2-a3b8-6999ad9c847b

---

## 📋 Teraz ustaw wszystko w panelu Railway

### 🔗 Otwórz panel:
https://railway.app/project/621f114b-60ab-44f2-a3b8-6999ad9c847b

---

## ⚙️ KROK 1: Połącz z GitHub

1. **Kliknij:** Settings (⚙️) w lewym menu
2. Scrolluj do sekcji **"Source"**
3. **Kliknij:** "Connect GitHub Repo"
4. **Wybierz repozytorium:** `Czaro2891/TensionsOnline`
5. **Branch:** `main`
6. **Root Directory:** `backend` ← **BARDZO WAŻNE!**
7. **Kliknij:** "Connect"

✅ Railway automatycznie zacznie wdrażać kod!

---

## 🔧 KROK 2: Sprawdź Root Directory

1. **Settings** → **"Service Settings"**
2. Znajdź: **"Root Directory"**
3. Upewnij się że jest: `backend`
4. Jeśli nie - wpisz: `backend` i zapisz

---

## 📝 KROK 3: Dodaj zmienne środowiskowe

1. **Kliknij:** "Variables" (w lewym menu)
2. **Kliknij:** "New Variable"
3. **Dodaj 3 zmienne** (jedna po drugiej):

### Zmienna 1:
```
Name: PORT
Value: 3001
```
Zapisz ✅

### Zmienna 2:
```
Name: NODE_ENV
Value: production
```
Zapisz ✅

### Zmienna 3:
```
Name: FRONTEND_URL
Value: https://strip-in-the-dark.vercel.app
```
Zapisz ✅

---

## 🌐 KROK 4: Wygeneruj domenę

1. **Settings** → **"Domains"**
2. **Kliknij:** "Generate Domain"
3. **Skopiuj URL** (np. `https://xxx.up.railway.app`)
4. **To jest URL twojego backendu!** ✅

---

## ✅ KROK 5: Sprawdź wdrożenie

1. **Kliknij:** "Deployments" (w lewym menu)
2. Zobaczysz status buildu
3. Po zakończeniu status: **"Success"** ✅

**Logi:**
- **Kliknij:** "Logs" - zobaczysz output serwera

---

## 🔍 Sprawdź czy działa

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

## 🔗 Co dalej?

### Zaktualizuj Vercel (Frontend):

1. Otwórz: https://vercel.com/cezars-projects-c10d5116/strip-in-the-dark/settings/environment-variables
2. Znajdź: `REACT_APP_BACKEND_URL`
3. Wpisz nowy URL z Railway (ten z kroku 4)
4. Zapisz
5. Redeploy w Vercel

---

## ✅ Checklist

- [ ] Połączony z GitHub (`Czaro2891/TensionsOnline`)
- [ ] Root Directory = `backend`
- [ ] PORT = 3001 (zmienna)
- [ ] NODE_ENV = production (zmienna)
- [ ] FRONTEND_URL = https://strip-in-the-dark.vercel.app (zmienna)
- [ ] Domain wygenerowany
- [ ] Build zakończony sukcesem
- [ ] `/api/health` działa

---

## 🎉 Gotowe!

Twój backend jest teraz na Railway! 🚂

---

## 📞 Szybkie linki:

- **Panel Railway:** https://railway.app/project/621f114b-60ab-44f2-a3b8-6999ad9c847b
- **Panel Vercel:** https://vercel.com/cezars-projects-c10d5116/strip-in-the-dark
- **GitHub Repo:** https://github.com/Czaro2891/TensionsOnline

