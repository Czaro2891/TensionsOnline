#!/bin/bash

# Skrypt do automatycznego połączenia Frontendu z Backendem

echo "🔗 Automatyczne połączenie Frontendu z Backendem"
echo ""

# Frontend URL
FRONTEND_URL="https://strip-in-the-dark-3opgns7um-cezars-projects-c10d6116.vercel.app"

echo "✅ Frontend URL: $FRONTEND_URL"
echo ""

# Pytaj o URL backendu
echo "📋 Podaj URL backendu z Railway:"
echo "   (np. https://xxx.up.railway.app)"
read -p "Backend URL: " BACKEND_URL

if [ -z "$BACKEND_URL" ]; then
    echo "❌ URL backendu jest wymagany!"
    exit 1
fi

echo ""
echo "🚀 Dodaję zmienną środowiskową w Vercel..."

# Dodaj zmienną w Vercel
echo "$BACKEND_URL" | vercel env add REACT_APP_BACKEND_URL production

if [ $? -eq 0 ]; then
    echo "✅ Zmienna dodana w Vercel!"
else
    echo "⚠️  Możliwe że trzeba dodać ręcznie. Użyj:"
    echo "   vercel env add REACT_APP_BACKEND_URL production"
fi

echo ""
echo "🔄 Redeploy frontendu..."
vercel --prod --yes

echo ""
echo "✅ GOTOWE!"
echo ""
echo "📋 Teraz dodaj w Railway:"
echo "   Name: FRONTEND_URL"
echo "   Value: $FRONTEND_URL"
echo ""
echo "🎉 Połączenie zakończone!"

