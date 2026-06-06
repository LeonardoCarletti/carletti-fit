#!/bin/bash
# Integra APENAS a loja no repo diabeticoimortal existente (não substitui o site)
set -e

MODULE="${1:-../carletti-fit/store-module}"

if [ ! -d "$MODULE/src" ]; then
  echo "❌ Módulo não encontrado: $MODULE"
  exit 1
fi

echo "📦 Integrando loja de $MODULE em $(pwd) ..."

mkdir -p src/data src/components src/pages/tools

cp -r "$MODULE/src/data/"* src/data/
cp -r "$MODULE/src/components/store" src/components/
cp "$MODULE/src/pages/Store.tsx" src/pages/
cp -r "$MODULE/src/pages/tools/"* src/pages/tools/

# vercel.json — merge rewrites se já existir
if [ -f vercel.json ]; then
  echo "ℹ️  vercel.json já existe — verifique se tem rewrites para SPA"
else
  cp "$MODULE/vercel.json" vercel.json
fi

echo ""
echo "✅ Arquivos da loja copiados."
echo ""
echo "⚠️  Ainda falta manualmente (ou peça ao agente):"
echo "   1. Adicionar rotas /loja em src/App.tsx"
echo "   2. Adicionar link 'Loja' no menu"
echo "   3. npm install react-router-dom (se necessário)"
echo ""
echo "   Veja: store-module/INTEGRATION.md"
echo ""
echo "Depois: git add -A && git commit -m 'feat: adicionar loja' && git push"
