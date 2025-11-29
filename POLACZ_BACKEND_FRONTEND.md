# 🔗 Połącz Backend z Frontendem - Krok po Kroku

## ✅ Frontend jest już na Vercel!
URL: https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app

## Teraz musisz:

### 1️⃣ Wdrożyć Backend na Railway (jeśli jeszcze nie)

Zobacz: `WDROZ_NA_RAILWAY.md`

Gdy backend będzie wdrożony, skopiuj jego URL (np. `https://xxx.up.railway.app`)

---

### 2️⃣ Dodać zmienną w Vercel

#### Przez Vercel CLI:

```bash
vercel env add REACT_APP_BACKEND_URL production
# Wpisz URL backendu z Railway (np. https://xxx.up.railway.app)
```

#### Przez Panel Vercel:

1. Otwórz: https://vercel.com/cezars-projects-c10d6116/strip-in-the-dark/settings/environment-variables
2. Kliknij: "Add New"
3. Wpisz:
   - **Key**: `REACT_APP_BACKEND_URL`
   - **Value**: URL z Railway (np. `https://xxx.up.railway.app`)
   - **Environments**: Zaznacz wszystkie (Production, Preview, Development)
4. Kliknij: "Save"
5. Kliknij: "Redeploy" aby zastosować zmiany

---

### 3️⃣ Dodać zmienną w Railway

1. Otwórz panel Railway
2. Kliknij na swój projekt backendu
3. Kliknij: "Variables"
4. Kliknij: "New Variable"
5. Dodaj:
   - **Name**: `FRONTEND_URL`
   - **Value**: `https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app`
6. Zapisz
7. Railway automatycznie zrestartuje backend

---

### 4️⃣ Sprawdź połączenie

1. Otwórz frontend: https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app
2. Spróbuj stworzyć pokój
3. Jeśli działa - **SUKCES!** 🎉

---

## 🎯 Szybkie Komendy

### Dodać zmienną w Vercel przez CLI:
```bash
# Najpierw sprawdź czy masz URL backendu
# Potem:
vercel env add REACT_APP_BACKEND_URL production
# Wpisz URL gdy zapyta
```

### Sprawdź zmienne w Vercel:
```bash
vercel env ls
```

### Redeploy po zmianie zmiennych:
```bash
vercel --prod
```

---

## 📋 Checklist

- [ ] Backend wdrożony na Railway
- [ ] URL backendu skopiowany
- [ ] `REACT_APP_BACKEND_URL` dodany w Vercel
- [ ] Frontend URL skopiowany
- [ ] `FRONTEND_URL` dodany w Railway
- [ ] Backend zrestartowany
- [ ] Frontend zredeployed
- [ ] Test połączenia wykonany

---

## 🆘 Problemy?

### CORS errors?
- Sprawdź czy `FRONTEND_URL` w Railway to dokładnie URL z Vercel
- URL musi być pełny (z `https://`)

### Socket.IO nie łączy?
- Sprawdź czy backend działa: otwórz `https://xxx.up.railway.app/api/health`
- Sprawdź czy `REACT_APP_BACKEND_URL` jest ustawiony w Vercel
- Upewnij się że oba używają HTTPS

### Frontend nie widzi backendu?
- Sprawdź czy zmienna `REACT_APP_BACKEND_URL` jest ustawiona
- Redeploy frontendu po dodaniu zmiennej
- Sprawdź w Developer Tools (F12) → Console czy są błędy

---

## ✅ Gotowe!

Gdy wszystko będzie skonfigurowane, aplikacja będzie w pełni funkcjonalna! 🎉

