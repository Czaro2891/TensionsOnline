# 🚂 Instalacja Railway CLI na Windows

## ✅ Railway CLI jest już zainstalowane!

**Aktualna wersja:** `4.12.0`

---

## ⚠️ Ważne: Komenda Unix/Linux nie działa na Windows

Komenda:
```bash
curl -fsSL https://railway.com/install.sh | sh
```
To jest komenda dla **Linux/macOS**. Na Windows PowerShell nie zadziała.

---

## ✅ Co zrobić na Windows:

### Metoda 1: npm (Zalecane - już zainstalowane!)
```powershell
npm install -g @railway/cli@latest
```

### Metoda 2: Scoop (jeśli masz Scoop)
```powershell
scoop install railway
```

### Metoda 3: Pobranie ręczne
1. Otwórz: https://github.com/railwayapp/cli/releases
2. Pobierz plik `.exe` dla Windows
3. Dodaj do PATH

---

## 🔍 Sprawdź instalację:

```powershell
railway --version
```

Powinieneś zobaczyć: `railway 4.12.0` (lub nowsza wersja)

---

## 📝 Podsumowanie:

- ✅ Railway CLI jest **już zainstalowane** (wersja 4.12.0)
- ✅ Działa poprawnie
- ✅ Nie potrzebujesz nic instalować

**Po prostu użyj:**
```powershell
railway login
railway status
railway variables
```

---

## 🚀 Co dalej?

Railway CLI jest gotowe! Możesz:
- Sprawdzić status: `railway status`
- Zobaczyć zmienne: `railway variables`
- Otworzyć panel: `railway open`
- Zobaczyć logi: `railway logs`

---

## 📚 Więcej informacji:

- Dokumentacja: https://docs.railway.com/guides/cli
- GitHub: https://github.com/railwayapp/cli

