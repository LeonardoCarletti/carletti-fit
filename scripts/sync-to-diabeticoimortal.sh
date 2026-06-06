#!/bin/bash
# Sincroniza apps/landing → repositório diabeticoimortal (conectado na Vercel)
# Rode no seu Mac, na pasta do repositório diabeticoimortal:
#
#   git clone git@github.com:LeonardoCarletti/diabeticoimortal.git
#   cd diabeticoimortal
#   bash /caminho/para/sync-to-diabeticoimortal.sh
#
# Ou copie manualmente o conteúdo de carletti-fit/apps/landing para a raiz do diabeticoimortal.

set -e

SOURCE="${1:-../carletti-fit/apps/landing}"

if [ ! -f "$SOURCE/package.json" ]; then
  echo "❌ Pasta fonte não encontrada: $SOURCE"
  echo "   Clone carletti-fit e passe o caminho: bash sync-to-diabeticoimortal.sh /path/to/carletti-fit/apps/landing"
  exit 1
fi

echo "📦 Copiando de $SOURCE para $(pwd) ..."

rsync -av --delete \
  --exclude node_modules \
  --exclude dist \
  --exclude .vercel \
  "$SOURCE/" ./

echo ""
echo "✅ Arquivos copiados. Agora rode:"
echo "   git add -A"
echo "   git commit -m 'feat: adicionar loja de produtos Carletti Fit'"
echo "   git push"
echo ""
echo "A Vercel vai fazer deploy automaticamente em diabeticoimortal.fit"
