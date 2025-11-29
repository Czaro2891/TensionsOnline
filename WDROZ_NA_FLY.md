# 🪰 Wdrożenie Backendu na Fly.io

## ✅ Alternatywa dla Railway - Darmowy plan!

Fly.io oferuje:
- ✅ Darmowy plan (3 shared-cpu VMs)
- ✅ Obsługę WebSocket/Socket.IO
- ✅ Automatyczne wdrażanie z GitHub
- ✅ Darmowy SSL
- ✅ Globalny edge network

---

## 📋 KROK PO KROKU:

### 1️⃣ Zainstaluj Fly CLI

**Windows (PowerShell):**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

**Lub przez npm:**
```powershell
npm install -g @fly/cli
```

---

### 2️⃣ Utwórz konto

1. **Otwórz:** https://fly.io
2. **Kliknij:** "Sign Up"
3. **Zaloguj się** przez GitHub
4. **Potwierdź** email

---

### 3️⃣ Zaloguj się przez CLI

```powershell
fly auth login
```

Otworzy się przeglądarka - zaloguj się.

---

### 4️⃣ Przejdź do folderu backend

```powershell
cd backend
```

---

### 5️⃣ Utwórz aplikację Fly.io

```powershell
fly launch
```

**Odpowiedz na pytania:**

- **App name:** `strip-in-the-dark-backend` (lub zostaw puste - Fly wygeneruje)
- **Region:** wybierz najbliższy (np. `fra` - Frankfurt)
- **Postgres?** No (N)
- **Redis?** No (N)
- **Deploy now?** No (N) - najpierw skonfigurujemy

---

### 6️⃣ Utwórz plik `fly.toml`

Fly automatycznie utworzy plik `fly.toml`. Sprawdź czy zawiera:

```toml
app = "strip-in-the-dark-backend"
primary_region = "fra"

[build]
  [build.args]
    NODE_ENV = "production"

[http_service]
  internal_port = 3001
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]

[[http_service.checks]]
  interval = "10s"
  timeout = "2s"
  grace_period = "5s"
  method = "GET"
  path = "/api/health"

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256
```

---

### 7️⃣ Dodaj zmienne środowiskowe

```powershell
fly secrets set PORT=3001
fly secrets set NODE_ENV=production
fly secrets set FRONTEND_URL=https://strip-in-the-dark.vercel.app
```

---

### 8️⃣ Wdróż aplikację

```powershell
fly deploy
```

Czekaj na zakończenie buildu (2-5 minut).

---

### 9️⃣ Sprawdź URL

```powershell
fly status
```

Lub sprawdź w panelu: https://fly.io/apps/strip-in-the-dark-backend

---

### 🔟 Sprawdź czy działa

Otwórz w przeglądarce:
```
https://strip-in-the-dark-backend.fly.dev/api/health
```

Powinieneś zobaczyć:
```json
{"status":"OK","timestamp":"..."}
```

**Jeśli działa - SUKCES!** 🎉

---

## 🔧 Przydatne komendy

```powershell
# Zobacz logi
fly logs

# Status aplikacji
fly status

# Otwórz aplikację w przeglądarce
fly open

# Lista wszystkich aplikacji
fly apps list

# Zobacz zmienne środowiskowe
fly secrets list
```

---

## 🔗 Co dalej?

### Zaktualizuj Frontend (Vercel):

1. Otwórz: https://vercel.com/cezars-projects-c10d5116/strip-in-the-dark/settings/environment-variables
2. Znajdź: `REACT_APP_BACKEND_URL`
3. Edytuj i wpisz: URL z Fly.io (np. `https://xxx.fly.dev`)
4. Zapisz
5. Vercel automatycznie zredeployuje

---

## ⚠️ Ważne uwagi

### Darmowy plan Fly.io:
- ✅ 3 shared-cpu VMs
- ✅ 256 MB RAM na VM
- ✅ 3 GB storage
- ✅ 160 GB transferu wychodzącego
- ⚠️ Machines automatycznie wyłączają się gdy nieużywane (auto_stop_machines)
- ⚠️ Automatycznie włączają się przy zapytaniu

---

## ✅ Checklist

- [ ] Fly CLI zainstalowane
- [ ] Konto utworzone
- [ ] Zalogowany przez CLI
- [ ] Aplikacja utworzona (`fly launch`)
- [ ] Zmienne środowiskowe ustawione (`fly secrets set`)
- [ ] Aplikacja wdrożona (`fly deploy`)
- [ ] `/api/health` działa
- [ ] Frontend zaktualizowany z URL backendu

---

## 🎉 Gotowe!

Twój backend jest teraz na Fly.io! 🪰

**Panel Fly.io:** https://fly.io/apps

---

## 📞 Szybkie linki:

- **Fly.io Dashboard:** https://fly.io/apps
- **Panel Vercel:** https://vercel.com/cezars-projects-c10d5116/strip-in-the-dark
- **GitHub Repo:** https://github.com/Czaro2891/TensionsOnline

