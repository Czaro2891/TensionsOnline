# 🚂 Wdrożenie na Railway przez CLI

## Szybkie wdrożenie

### KROK 1: Zaloguj się do Railway
```bash
railway login
```
Otworzy się przeglądarka - zaloguj się przez GitHub.

### KROK 2: Połącz projekt
```bash
cd backend
railway link --project 621f114b-60ab-44f2-a3b8-6999ad9c847b
```

### KROK 3: Ustaw root directory (jeśli nie ustawione)
W panelu Railway:
1. Settings → Root Directory → wpisz: `backend`
2. Zapisz

### KROK 4: Dodaj zmienne środowiskowe
```bash
# PORT
railway variables set PORT=3001

# NODE_ENV
railway variables set NODE_ENV=production

# FRONTEND_URL (wstaw URL z Vercel)
railway variables set FRONTEND_URL=https://strip-in-the-dark.vercel.app
```

### KROK 5: Wdróż
```bash
railway up
```

---

## Alternatywnie: Przez Panel Railway

1. **Otwórz**: https://railway.app/project/621f114b-60ab-44f2-a3b8-6999ad9c847b
2. **Settings** → **Root Directory**: `backend`
3. **Variables** → Dodaj:
   - `PORT=3001`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://strip-in-the-dark.vercel.app`
4. **Deployments** → Railway automatycznie wdroży po połączeniu z GitHub

---

## Połącz z GitHub (jeśli jeszcze nie)

1. W Railway: **Settings** → **Connect GitHub Repo**
2. Wybierz: `Czaro2891/TensionsOnline`
3. Branch: `main`
4. Root Directory: `backend`
5. Railway automatycznie wdroży!

---

## Sprawdź status

```bash
railway status
railway logs
```

---

## URL Backendu

Po wdrożeniu:
- Railway automatycznie przypisze domenę
- Znajdziesz ją w: **Settings** → **Domains**
- Lub użyj: `railway domain`

---

## Gotowe! 🎉

Backend powinien być dostępny pod adresem typu:
`https://xxx.up.railway.app`

Sprawdź: `https://xxx.up.railway.app/api/health`

