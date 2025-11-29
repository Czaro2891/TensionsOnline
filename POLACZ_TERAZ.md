# 🔗 Połącz Teraz - Najprostszy Sposób

## ✅ Frontend jest już wdrożony!
**URL**: https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app

## 🚀 Jeśli masz backend na Railway:

### Opcja 1: Automatycznie przez skrypt (Windows)

```powershell
.\polacz-backend.ps1
# Wpisz URL backendu gdy zapyta
```

### Opcja 2: Przez Vercel CLI

```bash
# 1. Dodaj zmienną (wpisz URL backendu gdy zapyta)
vercel env add REACT_APP_BACKEND_URL production

# 2. Redeploy
vercel --prod
```

### Opcja 3: Przez Panel Vercel (Najprościej!)

1. **Otwórz**: https://vercel.com/cezars-projects-c10d6116/strip-in-the-dark/settings/environment-variables
2. **Kliknij**: "Add New"
3. **Dodaj**:
   - Key: `REACT_APP_BACKEND_URL`
   - Value: `https://xxx.up.railway.app` (URL z Railway)
   - Environments: ✅ Production, ✅ Preview, ✅ Development
4. **Zapisz**
5. **Redeploy**: Deployments → "Redeploy"

---

## 📋 Potrzebne informacje:

- **Frontend URL**: `https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app`
- **Backend URL**: (musisz mieć z Railway - np. `https://xxx.up.railway.app`)

---

## 🔗 Potem w Railway:

1. Variables → New Variable
2. Name: `FRONTEND_URL`
3. Value: `https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app`
4. Zapisz

---

## ❓ Nie masz backendu?

Zobacz: `WDROZ_NA_RAILWAY.md`

