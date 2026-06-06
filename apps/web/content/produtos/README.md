# Produtos Carletti Fit — Instruções de Upload

Copie os arquivos da pasta local `produtos-carlettifit-2` para os caminhos abaixo no repositório:

## Mapeamento de arquivos

| Arquivo local | Destino no projeto |
|---|---|
| `Guia nutricional/Guia_Nutricional_FINAL_VENDA.pdf` | `apps/web/public/downloads/Guia_Nutricional_FINAL_VENDA.pdf` |
| `Guia nutricional/CARLETTI_FIT_Handoff_Completo.md` | `apps/web/content/produtos/CARLETTI_FIT_Handoff_Completo.md` |
| `Ebooks calculadora etc/SPEC-guia-marcas-cursor.md` | `apps/web/content/produtos/SPEC-guia-marcas-cursor.md` |
| `Ebooks calculadora etc/files/calculadora-carga-glicemica.jsx` | `apps/web/components/produtos/calculadora-carga-glicemica.tsx` |
| `Ebooks calculadora etc/files/guia-expandido-v2.jsx` | `apps/web/components/produtos/guia-expandido-v2.tsx` |
| `Ebooks calculadora etc/files/top10-enganos.jsx` | `apps/web/components/produtos/top10-enganos.tsx` |

## Imagens de capa (opcional)

Coloque imagens de capa em `apps/web/public/products/`:

- `guia-nutricional.jpg`
- `calculadora-carga-glicemica.jpg`
- `guia-marcas-expandido.jpg`
- `top-10-enganos.jpg`
- `pack-nutricao-completo.jpg`

## Após copiar os arquivos

1. Atualize preços em `apps/web/data/products.json` conforme o handoff
2. Ajuste o WhatsApp em `apps/web/lib/products.ts` (`WHATSAPP_NUMBER`)
3. Converta os `.jsx` para `.tsx` e integre nas páginas em `apps/web/app/loja/ferramentas/`

## Comando rápido (no seu Mac)

```bash
# Na raiz do repositório carletti-fit:
cp ~/Downloads/produtos-carlettifit-2/Guia\ nutricional/Guia_Nutricional_FINAL_VENDA.pdf apps/web/public/downloads/
cp ~/Downloads/produtos-carlettifit-2/Guia\ nutricional/CARLETTI_FIT_Handoff_Completo.md apps/web/content/produtos/
cp ~/Downloads/produtos-carlettifit-2/Ebooks\ calculadora\ etc/SPEC-guia-marcas-cursor.md apps/web/content/produtos/
cp ~/Downloads/produtos-carlettifit-2/Ebooks\ calculadora\ etc/files/*.jsx apps/web/components/produtos/
```
