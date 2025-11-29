# 🔗 Jak połączyć Frontend (Vercel) z Backendem (Railway)

## ✅ Frontend już jest wdrożony!
**URL Frontendu**: https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app

## 📋 Co musisz zrobić:

### KROK 1: Backend na Railway
Jeśli jeszcze nie masz backendu na Railway:
- Zobacz: `WDROZ_NA_RAILWAY.md`
- Wdróż backend
- Skopiuj URL backendu (np. `https://xxx.up.railway.app`)

### KROK 2: Dodaj zmienną w Vercel

**URL Frontendu**: `https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app`

**Przez CLI (szybko):**
```bash
vercel env add REACT_APP_BACKEND_URL production
# Gdy zapyta o wartość, wpisz URL backendu z Railway
```

**Przez Panel Vercel:**
1. Otwórz: https://vercel.com/cezars-projects-c10d6116/strip-in-the-dark/settings/environment-variables
2. Kliknij: "Add New"
3. Wpisz:
   - Key: `REACT_APP_BACKEND_URL`
   - Value: `https://xxx.up.railway.app` (URL z Railway)
   - Environments: zaznacz wszystkie
4. Kliknij: "Save"
5. Kliknij: "Redeploy" w zakładce Deployments

### KROK 3: Dodaj zmienną w Railway

1. Otwórz panel Railway
2. Znajdź swój backend
3. Kliknij: "Variables"
4. Dodaj:
   - Name: `FRONTEND_URL`
   - Value: `https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app`
5. Zapisz (Railway automatycznie zrestartuje)

---

## 🎉 Gotowe!

Teraz oba serwisy są połączone!

---

## 🐛 Testuj:

1. Otwórz frontend w przeglądarce
2. Spróbuj stworzyć pokój
3. Jeśli działa - sukces! ✅

