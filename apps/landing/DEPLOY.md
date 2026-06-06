# Deploy — diabeticoimortal.fit

**Projeto Vercel:** https://vercel.com/leeocarletti-1131s-projects/diabeticoimortal

O código da loja está em `apps/landing/` na branch `master` do repo `LeonardoCarletti/carletti-fit`.

## Conectar e publicar (faça uma vez)

O projeto Vercel ainda mostra **"Connect Git Repository"** — ou seja, não está ligado ao GitHub. Siga:

1. Abra: https://vercel.com/leeocarletti-1131s-projects/diabeticoimortal/settings/git
2. Clique em **Connect Git Repository**
3. Escolha **GitHub** → repositório **`LeonardoCarletti/carletti-fit`**
4. Em **Settings → General** configure:
   - **Production Branch:** `master`
   - **Root Directory:** `apps/landing` ← importante
   - **Framework Preset:** Vite
5. Vá em **Deployments** → **Redeploy** (ou aguarde o deploy automático)

## Verificar se funcionou

Após o deploy, estas URLs devem abrir a **nova** loja:

- https://diabeticoimortal.fit/loja
- https://diabeticoimortal.fit/loja/ferramentas/calculadora-carga-glicemica

Se `/loja` mostrar a landing antiga sem menu "Loja", o Root Directory está errado ou o redeploy não rodou.

## WhatsApp

Edite `src/data/products.ts` → `WHATSAPP_NUMBER` com seu número (ex: `5511999887766`).
