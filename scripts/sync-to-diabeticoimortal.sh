#!/bin/bash
# ⚠️ CUIDADO: este script SUBSTITUI o projeto inteiro.
# Para manter o site existente, use integrate-store-only.sh
set -e

SOURCE="${1:-../carletti-fit/apps/landing}"

if [ ! -f "$SOURCE/package.json" ]; then
  echo "❌ Pasta fonte não encontrada: $SOURCE"
  exit 1
fi

echo "⚠️  ATENÇÃO: este script substitui TODOS os arquivos do projeto."
echo "    Para adicionar só a loja, use: integrate-store-only.sh"
echo ""
read -p "Continuar? (s/N) " -n 1 -r
echo
[[ $REPLY =~ ^[Ss]$ ]] || exit 0

rsync -av --delete \
  --exclude node_modules \
  --exclude dist \
  --exclude .vercel \
  "$SOURCE/" ./

echo "✅ Copiado. Rode: git add -A && git commit -m 'feat: site com loja' && git push"
