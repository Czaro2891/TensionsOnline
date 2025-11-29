# 🚂 Wdrożenie na Railway - KROK PO KROKU

## ✅ Wszystko gotowe! Teraz tylko wykonaj te kroki:

### 📋 KROK 1: Przygotuj kod na GitHub (2 min)

```bash
# Jeśli jeszcze nie masz na GitHub:
git add .
git commit -m "Ready for Railway"
git push origin main
```

### 🚂 KROK 2: Railway - Utwórz projekt (3 min)

1. **Otwórz**: https://railway.app
2. **Kliknij**: "Start a New Project"
3. **Wybierz**: "Deploy from GitHub repo"
4. **Zaloguj się** przez GitHub (jeśli trzeba)
5. **Wybierz** swoje repozytorium
6. **Kliknij**: "Deploy Now"

### ⚙️ KROK 3: Ustaw folder backend (1 min)

1. **Kliknij** na swój projekt w Railway
2. **Kliknij** na serwis (service)
3. **Kliknij**: "Settings" (⚙️)
4. **Znajdź**: "Root Directory"
5. **Wpisz**: `backend`
6. **Zapisz**

### 🔧 KROK 4: Dodaj zmienne środowiskowe (2 min)

1. **Kliknij**: "Variables" (w lewym menu)
2. **Kliknij**: "New Variable"
3. **Dodaj** te zmienne (jedna po drugiej):

```
Nazwa: PORT
Wartość: 3001
```

```
Nazwa: NODE_ENV  
Wartość: production
```

```
Nazwa: FRONTEND_URL
Wartość: (zostaw puste na razie)
```

4. **Zapisz** każdą zmienną

### 🌐 KROK 5: Wygeneruj domenę (1 min)

1. **Kliknij**: "Settings" (⚙️)
2. **Znajdź**: "Domains"
3. **Kliknij**: "Generate Domain"
4. **Skopiuj URL** (np. `https://xxx.up.railway.app`)
5. **To jest URL twojego backendu!** ✅

### ✅ KROK 6: Sprawdź czy działa (1 min)

1. Otwórz w przeglądarce: `https://xxx.up.railway.app/api/health`
2. Powinieneś zobaczyć: `{"status":"OK","timestamp":"..."}`
3. **Jeśli działa - SUKCES!** 🎉

---

## 🎯 Co dalej?

Teraz masz backend na Railway! 

**Następny krok**: Połącz frontend z backendem:

### W Vercel (Frontend):
1. Otwórz: https://vercel.com/cezars-projects-c10d6116/strip-in-the-dark/settings/environment-variables
2. Kliknij: "Add New"
3. Dodaj:
   - **Name**: `REACT_APP_BACKEND_URL`
   - **Value**: `https://xxx.up.railway.app` (wstaw tutaj URL backendu z Railway!)
   - **Environments**: zaznacz wszystkie (Production, Preview, Development)
4. Zapisz
5. Redeploy projektu

### W Railway (Backend):
1. Kliknij: "Variables"
2. Dodaj:
   - **Name**: `FRONTEND_URL`
   - **Value**: `https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app`
3. Zapisz (Railway automatycznie zrestartuje)

📖 **Pełna instrukcja**: Zobacz `JAK_POLACZYC.md` lub `POLACZ_BACKEND_FRONTEND.md`

---

## 🐛 Problemy?

### Nie działa?
- Sprawdź **Logs** w Railway (kliknij "Logs" w lewym menu)
- Sprawdź czy Root Directory = `backend`
- Sprawdź czy zmienne środowiskowe są ustawione

### Błąd "Cannot find module"?
- Railway automatycznie instaluje zależności
- Sprawdź logi - może być problem z `package.json`

### Port error?
- Railway automatycznie ustawia PORT
- Nie zmieniaj kodu - używa `process.env.PORT` (już jest ✅)

---

## 📸 Wizualny Przewodnik

### Railway Dashboard:
```
[New Project] → [Deploy from GitHub] → [Wybierz repo] → [Deploy]
```

### Settings:
```
[Settings] → [Root Directory] → wpisz: backend
```

### Variables:
```
[Variables] → [New Variable] → Dodaj: PORT=3001, NODE_ENV=production
```

### Domain:
```
[Settings] → [Domains] → [Generate Domain] → Skopiuj URL
```

---

## ✅ Checklist

- [ ] Kod jest na GitHub
- [ ] Projekt utworzony w Railway
- [ ] Root Directory = `backend`
- [ ] PORT = 3001 (zmienna)
- [ ] NODE_ENV = production (zmienna)
- [ ] Domain wygenerowany
- [ ] `/api/health` działa

---

## 🎉 Gotowe!

Twój backend jest teraz na Railway! 🚂

