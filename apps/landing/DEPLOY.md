# Deploy — diabeticoimortal.fit

**Projeto Vercel:** https://vercel.com/leeocarletti-1131s-projects/diabeticoimortal

**Repositório conectado na Vercel:** `LeonardoCarletti/diabeticoimortal` (privado)

## Situação

O código da loja está em **`LeonardoCarletti/carletti-fit`** → pasta `apps/landing/`.

A Vercel está ligada ao repo **`diabeticoimortal`** (outro repositório). Por isso o site em produção ainda não mostra a loja.

## Opção A — Sincronizar para o repo diabeticoimortal (recomendado)

No seu Mac:

```bash
# 1. Clone os dois repos
git clone https://github.com/LeonardoCarletti/carletti-fit.git
git clone https://github.com/LeonardoCarletti/diabeticoimortal.git

# 2. Entre no repo da Vercel
cd diabeticoimortal

# 3. Rode o script de sincronização
bash ../carletti-fit/scripts/sync-to-diabeticoimortal.sh ../carletti-fit/apps/landing

# 4. Publique
git add -A
git commit -m "feat: adicionar loja de produtos Carletti Fit"
git push
```

A Vercel faz deploy automático. Aguarde 1–2 min e acesse https://diabeticoimortal.fit/loja

## Opção B — Trocar o repo na Vercel

Se preferir manter tudo só no `carletti-fit`:

1. https://vercel.com/leeocarletti-1131s-projects/diabeticoimortal/settings/git
2. **Disconnect** → **Connect** → `LeonardoCarletti/carletti-fit`
3. **Settings → General** → **Root Directory:** `apps/landing`
4. **Redeploy**

## Verificar

- https://diabeticoimortal.fit/loja
- https://diabeticoimortal.fit/loja/ferramentas/calculadora-carga-glicemica

## WhatsApp

Edite `src/data/products.ts` → `WHATSAPP_NUMBER`
