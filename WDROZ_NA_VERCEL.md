# ⚡ Wdrożenie Frontendu na Vercel - KROK PO KROKU

## ✅ Wszystko gotowe! Teraz tylko wykonaj te kroki:

### 📋 KROK 1: Przygotuj kod na GitHub (2 min)

```bash
# Jeśli jeszcze nie masz na GitHub:
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### ⚡ KROK 2: Vercel - Utwórz projekt (3 min)

1. **Otwórz**: https://vercel.com
2. **Kliknij**: "Sign Up" lub "Log In"
3. **Zaloguj się** przez GitHub (najłatwiej)
4. **Kliknij**: "Add New..." → "Project"
5. **Wybierz** swoje repozytorium GitHub
6. **Kliknij**: "Import"

### ⚙️ KROK 3: Konfiguracja projektu (2 min)

Vercel automatycznie wykryje React! Sprawdź czy:

1. **Framework Preset**: Create React App (powinno być automatycznie)
2. **Root Directory**: `.` (root - zostaw jak jest)
3. **Build Command**: `npm run build` (powinno być automatycznie)
4. **Output Directory**: `build` (powinno być automatycznie)

✅ Jeśli wszystko OK, kliknij "Next"

### 🔧 KROK 4: Dodaj zmienne środowiskowe (2 min)

1. **Kliknij**: "Environment Variables"
2. **Dodaj** zmienną:

```
Name: REACT_APP_BACKEND_URL
Value: https://xxx.up.railway.app
```

⚠️ **WAŻNE**: Wstaw tutaj URL twojego backendu z Railway!

Jeśli jeszcze nie masz backendu na Railway:
- **Tymczasowo**: zostaw puste lub wpisz `http://localhost:3001`
- **Później**: wróć do Settings i zmień

3. **Kliknij**: "Add"
4. **Zaznacz**: wszystkie środowiska (Production, Preview, Development)

### 🚀 KROK 5: Wdróż! (3 min)

1. **Kliknij**: "Deploy"
2. **Czekaj** 2-3 minuty (Vercel buduje aplikację)
3. **Po zakończeniu** zobaczysz:
   - ✅ "Build completed"
   - URL twojej aplikacji (np. `https://xxx.vercel.app`)

### ✅ KROK 6: Sprawdź czy działa (1 min)

1. **Kliknij** na URL lub otwórz go w przeglądarce
2. Aplikacja powinna się otworzyć! 🎉
3. **Spróbuj** stworzyć pokój (jeśli backend działa)

---

## 🔗 Połączenie z backendem

### Jeśli backend już jest na Railway:

1. **W Vercel**:
   - Settings → Environment Variables
   - Edytuj `REACT_APP_BACKEND_URL`
   - Wstaw URL z Railway
   - **Zapisz**

2. **W Railway**:
   - Settings → Variables
   - Dodaj: `FRONTEND_URL` = URL z Vercel
   - **Redeploy** backendu

3. **W Vercel**:
   - Kliknij "Redeploy" (lub automatycznie się zaktualizuje)

### Jeśli backend jeszcze nie jest na Railway:

Zobacz: `WDROZ_NA_RAILWAY.md`

---

## 🎯 Co dalej?

### Automatyczne wdrożenia:

- ✅ Każdy `git push` automatycznie wdraża na Vercel!
- ✅ Vercel tworzy też preview dla każdego PR

### Domena własna (opcjonalnie):

1. Settings → Domains
2. Dodaj swoją domenę
3. Vercel automatycznie skonfiguruje SSL

---

## 🐛 Problemy?

### Build failed?
- Sprawdź logi w Vercel (kliknij na deployment → "Logs")
- Sprawdź czy wszystkie zależności są w `package.json`
- Sprawdź czy `npm run build` działa lokalnie

### Błędy CORS?
- Upewnij się, że `REACT_APP_BACKEND_URL` jest poprawny
- Sprawdź czy backend ma ustawione `FRONTEND_URL`

### Aplikacja się nie ładuje?
- Otwórz Developer Tools (F12) → Console
- Sprawdź błędy
- Sprawdź Network tab

### Nie łączy się z backendem?
- Sprawdź czy backend działa: `https://xxx.up.railway.app/api/health`
- Sprawdź czy `REACT_APP_BACKEND_URL` jest ustawiony w Vercel
- Sprawdź czy oba używają HTTPS

---

## 📸 Wizualny Przewodnik

### Vercel Dashboard:
```
[Add New] → [Project] → [Import Git Repository] → [Wybierz repo] → [Import]
```

### Environment Variables:
```
[Settings] → [Environment Variables] → [Add New]
Name: REACT_APP_BACKEND_URL
Value: https://xxx.up.railway.app
```

### Deploy:
```
[Deploy] → [Czekaj] → [Gotowe!] → [Otwórz URL]
```

---

## ✅ Checklist

- [ ] Kod jest na GitHub
- [ ] Projekt utworzony w Vercel
- [ ] Framework: Create React App
- [ ] Root Directory: `.`
- [ ] `REACT_APP_BACKEND_URL` ustawiony
- [ ] Deploy zakończony pomyślnie
- [ ] Aplikacja działa w przeglądarce

---

## 🎉 Gotowe!

Twój frontend jest teraz na Vercel! ⚡

**Następny krok**: Połącz z backendem (jeśli jeszcze nie) → `WDROZ_NA_RAILWAY.md`

---

## 💰 Koszty

- **Vercel**: ✅ **DARMOWE** (plan Hobby)
- **Limity darmowego planu**:
  - 100 GB bandwidth/miesiąc
  - 100 build hours/miesiąc
  - Nielimitowane projekty

---

## 🔄 Automatyczne wdrożenia

Po połączeniu z GitHub:
- Każdy push do `main` → automatyczny deploy na produkcję
- Każdy PR → automatyczny preview deployment
- Rollback do poprzedniej wersji w jednym kliknięciu

---

## 📚 Przydatne Linki

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Status](https://vercel-status.com)

