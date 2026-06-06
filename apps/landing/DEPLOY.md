# Deploy automático — diabeticoimortal.fit

O código da loja já está pronto. Para publicar no seu domínio, faça **uma vez** na Vercel:

## Passo a passo (2 minutos)

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Abra o projeto ligado ao domínio **diabeticoimortal.fit**
3. Vá em **Settings → General**
4. Configure:
   - **Repository:** `LeonardoCarletti/carletti-fit`
   - **Production Branch:** `master`
   - **Root Directory:** `apps/landing`
   - **Framework Preset:** Vite
5. Clique em **Deployments → Redeploy**

Pronto. A partir daí, todo `git push` na `master` atualiza o site automaticamente.

## URLs após deploy

- Home: `https://diabeticoimortal.fit/`
- Loja: `https://diabeticoimortal.fit/loja`
- Calculadora CG: `https://diabeticoimortal.fit/loja/ferramentas/calculadora-carga-glicemica`

## WhatsApp

Edite `src/data/products.ts` → `WHATSAPP_NUMBER` com seu número real (ex: `5511999887766`).
