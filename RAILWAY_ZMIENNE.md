# ⚙️ Ustawienie zmiennych w Railway

## ⚠️ Ważne

Railway CLI wymaga wyższego planu do ustawiania zmiennych. Ustaw je przez panel:

---

## 🔧 Ustaw przez Panel Railway

### KROK 1: Otwórz panel
https://railway.app/project/621f114b-60ab-44f2-a3b8-6999ad9c847b

### KROK 2: Dodaj zmienne
1. Kliknij: **"Variables"** (w lewym menu)
2. Kliknij: **"New Variable"**
3. Dodaj każdą zmienną osobno:

**Zmienna 1:**
```
Name: PORT
Value: 3001
```

**Zmienna 2:**
```
Name: NODE_ENV
Value: production
```

**Zmienna 3:**
```
Name: FRONTEND_URL
Value: https://strip-in-the-dark.vercel.app
```

4. Zapisz każdą zmienną (Railway zrestartuje automatycznie)

---

## ✅ Sprawdź czy są ustawione

```bash
railway variables
```

Powinny się pojawić:
- PORT = 3001
- NODE_ENV = production
- FRONTEND_URL = https://strip-in-the-dark.vercel.app

---

## 🚀 Następny krok

Po ustawieniu zmiennych:
1. Railway automatycznie zrestartuje serwis
2. Sprawdź logi: `railway logs`
3. Sprawdź domenę: `railway domain` lub w panelu Settings → Domains

