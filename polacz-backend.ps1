# Skrypt do automatycznego połączenia Frontendu z Backendem

Write-Host "🔗 Automatyczne połączenie Frontendu z Backendem" -ForegroundColor Cyan
Write-Host ""

# Frontend URL
$FRONTEND_URL = "https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app"

Write-Host "✅ Frontend URL: $FRONTEND_URL" -ForegroundColor Green
Write-Host ""

# Pytaj o URL backendu
Write-Host "📋 Podaj URL backendu z Railway:" -ForegroundColor Yellow
Write-Host "   (np. https://xxx.up.railway.app)" -ForegroundColor Gray
$BACKEND_URL = Read-Host "Backend URL"

if ([string]::IsNullOrWhiteSpace($BACKEND_URL)) {
    Write-Host "❌ URL backendu jest wymagany!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🚀 Dodaję zmienną środowiskową w Vercel..." -ForegroundColor Cyan

# Dodaj zmienną w Vercel
vercel env add REACT_APP_BACKEND_URL production <<EOF
$BACKEND_URL
EOF

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Zmienna dodana w Vercel!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Możliwe że trzeba dodać ręcznie. Użyj:" -ForegroundColor Yellow
    Write-Host "   vercel env add REACT_APP_BACKEND_URL production" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🔄 Redeploy frontendu..." -ForegroundColor Cyan
vercel --prod --yes

Write-Host ""
Write-Host "✅ GOTOWE!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Teraz dodaj w Railway:" -ForegroundColor Yellow
Write-Host "   Name: FRONTEND_URL" -ForegroundColor Gray
Write-Host "   Value: $FRONTEND_URL" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 Połączenie zakończone!" -ForegroundColor Green

