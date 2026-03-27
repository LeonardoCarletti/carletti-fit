# Carletti Fit - SaaS Multi-tenant

Este projeto segue a estrutura de monorepo SaaS multi-tenant conforme o contrato `/Agents`.

## Estrutura

- `apps/web`: Next.js App Router
- `apps/mobile`: React Native + Expo
- `apps/backend`: FastAPI
- `packages/ui`: Design System
- `packages/core`: Lógica de domínio
- `packages/api-client`: Client TypeScript gerado

## Desenvolvimento

- Use `pnpm install` para instalar dependências.
- Use `pnpm dev` para rodar todos os apps em paralelo (via Turbo).
