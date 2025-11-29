# 🚀 Wdrożenie na Railway - PROSTY PRZEWODNIK

## 📋 Projekt ID: `621f114b-60ab-44f2-a3b8-6999ad9c847b`

---

## 🎯 KROK 1: Otwórz Panel Railway

**Link bezpośredni:**
👉 https://railway.app/project/621f114b-60ab-44f2-a3b8-6999ad9c847b

---

## 🔗 KROK 2: Połącz z GitHub

1. W lewym menu kliknij **"Settings"** ⚙️
2. Scrolluj w dół do sekcji **"Source"**
3. Kliknij **"Connect GitHub Repo"**
4. Wybierz: **`Czaro2891/TensionsOnline`**
5. Branch: **`main`**
6. **Root Directory:** `backend` ⚠️ **WAŻNE!**
7. Kliknij **"Connect"**

✅ Railway automatycznie zacznie wdrażać kod!

---

## ⚙️ KROK 3: Ustaw Root Directory (jeśli nie było w kroku 2)

1. **Settings** → **"Service Settings"**
2. Znajdź: **"Root Directory"**
3. Wpisz: `backend`
4. Zapisz

---

## 📝 KROK 4: Dodaj zmienne środowiskowe

1. Kliknij **"Variables"** (w lewym menu)
2. Kliknij **"New Variable"**
3. Dodaj te 3 zmienne (jedna po drugiej):

### ✅ Zmienna 1:
```
Name: PORT
Value: 3001
```
Zapisz

### ✅ Zmienna 2:
```
Name: NODE_ENV
Value: production
```
Zapisz

### ✅ Zmienna 3:
```
Name: FRONTEND_URL
Value: https://strip-in-the-dark.vercel.app
```
Zapisz

---

## 🌐 KROK 5: Wygeneruj domenę

1. **Settings** → **"Domains"**
2. Kliknij **"Generate Domain"**
3. Skopiuj URL (np. `https://xxx.up.railway.app`)
4. **To jest URL twojego backendu!** ✅

---

## ✅ KROK 6: Sprawdź wdrożenie

1. Kliknij **"Deployments"** (w lewym menu)
2. Zobaczysz status buildu
3. Poczekaj aż status będzie: **"Success"** ✅

**Logi:**
- Kliknij **"Logs"** - zobaczysz output serwera w czasie rzeczywistym

---

## 🔍 KROK 7: Sprawdź czy działa

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

## 🔗 KROK 8: Zaktualizuj Frontend (Vercel)

1. Otwórz: https://vercel.com/cezars-projects-c10d5116/strip-in-the-dark/settings/environment-variables
2. Znajdź: `REACT_APP_BACKEND_URL`
3. Edytuj i wpisz: URL z Railway (ten z kroku 5)
4. Zapisz
5. Vercel automatycznie zredeployuje

---

## ✅ Checklist

- [ ] Panel Railway otwarty
- [ ] Połączony z GitHub (`Czaro2891/TensionsOnline`)
- [ ] Root Directory = `backend`
- [ ] PORT = 3001 (zmienna)
- [ ] NODE_ENV = production (zmienna)
- [ ] FRONTEND_URL = https://strip-in-the-dark.vercel.app (zmienna)
- [ ] Domain wygenerowany
- [ ] Build zakończony sukcesem
- [ ] `/api/health` działa
- [ ] Frontend zaktualizowany z URL backendu

---

## 📞 Szybkie linki:

- **Panel Railway:** https://railway.app/project/621f114b-60ab-44f2-a3b8-6999ad9c847b
- **Panel Vercel:** https://vercel.com/cezars-projects-c10d5116/strip-in-the-dark
- **GitHub Repo:** https://github.com/Czaro2891/TensionsOnline
- **Frontend:** https://strip-in-the-dark.vercel.app

---

## 🎉 Gotowe!

Po wykonaniu wszystkich kroków:
- ✅ Backend będzie działał na Railway
- ✅ Frontend będzie połączony z backendem
- ✅ Aplikacja będzie w pełni funkcjonalna!

---

## ⏱️ Czas: ~10 minut

Wszystko powinno być gotowe w około 10 minut!

