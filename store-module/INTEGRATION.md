# Integrar Loja no diabeticoimortal (sem substituir o site)

Este pacote adiciona **apenas a loja** ao projeto existente.

## 1. Copiar arquivos

Na raiz do repo `diabeticoimortal`:

```bash
cp -r store-module/src/data src/
cp -r store-module/src/components/store src/components/
cp -r store-module/src/pages/Store.tsx src/pages/
mkdir -p src/pages/tools
cp -r store-module/src/pages/tools/* src/pages/tools/
```

## 2. Dependência (se ainda não tiver)

```bash
npm install react-router-dom
```

## 3. Rotas — editar `src/App.tsx`

Adicione as rotas da loja **sem remover** as existentes:

```tsx
import { Store } from "./pages/Store";
import { CalculadoraCargaGlicemica } from "./pages/tools/CalculadoraCargaGlicemica";
import { GuiaMarcas } from "./pages/tools/GuiaMarcas";
import { Top10Enganos } from "./pages/tools/Top10Enganos";

// Dentro de <Routes>:
<Route path="/loja" element={<Store />} />
<Route path="/loja/ferramentas/calculadora-carga-glicemica" element={<CalculadoraCargaGlicemica />} />
<Route path="/loja/ferramentas/guia-marcas-expandido" element={<GuiaMarcas />} />
<Route path="/loja/ferramentas/top-10-enganos" element={<Top10Enganos />} />
```

## 4. Menu — editar o Navbar existente

Adicione um link:

```tsx
<Link to="/loja">Loja</Link>
```

## 5. SPA — `vercel.json`

Garanta o rewrite para rotas client-side:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 6. WhatsApp

Edite `src/data/products.ts` → `WHATSAPP_NUMBER`

## 7. Publicar

```bash
git add -A
git commit -m "feat: adicionar loja de produtos"
git push
```
