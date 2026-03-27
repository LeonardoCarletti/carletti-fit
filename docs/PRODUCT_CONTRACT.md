# Contrato de Produto e Arquitetura - Carletti Fit

## 1. Proposta de valor (norte de produto)
**Headline:** Um cockpit de performance para coaches e atletas: treino, saúde e IA em um só lugar.
**Subheadline:** Carletti Fit é a plataforma onde o coach monta planos em minutos, a IA cuida dos ajustes semanais e os dados de saúde (glicemia, HRV, sono) fecham o loop de performance.

**Bullets de valor:**
- Coach cria, ajusta e acompanha treinos mais rápido que em Trainerize/TrueCoach, com uma interface que ele domina em 5 minutos.
- IA gera planos, detecta platôs e alerta sobre risco de churn, mas o coach sempre tem a palavra final.
- Dados de saúde integrados (wearables, glicemia, sono) alimentam insights inteligentes sem complicar a experiência.
- Ferramentas de negócio (CRM, billing, check‑ins, relatórios) mostram claramente o valor do coach para cada aluno.

## 2. Contrato de foco competitivo
### 2.1. UX simples para o coach
O coach deve conseguir entender o app em 5 minutos e montar um plano básico em menos de 10 minutos. Fluxos com o mínimo de passos. 
- “Quem precisa de atenção hoje?”
- “O que devo ajustar agora?”

### 2.2. Confiabilidade e estabilidade
A experiência deve ser “chata e previsível”. Nenhuma funcionalidade de IA deve quebrar o fluxo principal se falhar.

### 2.3. Ferramentas de negócio para o coach
Gestão de alunos (CRM), planos e billing, comunicação/check-ins e relatórios diretamente no painel.

## 3. As Três "Big Features"
1. **IA de treino e insights:** Gera planos, sugere ajustes semanais, detecta platôs/churn. O coach sempre aprova.
2. **Saúde Integrada:** Glicemia, HRV, sono. Opcional, mas enriquece a IA se conectado.
3. **UX/Negócio para Coach:** "Casca SaaS" (CRM, billing, automações, branding).

## 4. Estratégia de Entrega (Camadas)
1. **MVP Coach + Aluno:** UX/Negócio + Treino sólido. Sem isso o coach não fica.
2. **Plugar IA:** "Gerar plano com IA", "Insights de IA". Apresentado como sugestão editável.
3. **Acoplar Saúde Profunda:** Wearables, glicemia. O app modo turbo.

## 5. Contrato de Arquitetura e Organização
**Monorepo:**
- `apps/web`: Next.js App Router
- `apps/mobile`: React Native + Expo
- `apps/backend`: FastAPI
- `packages/api-client`: Client TS gerado do OpenAPI
- `packages/core`: Lógica JS/TS
- `packages/ui`: Design system
- `packages/config`: Configurações globais (eslint, etc.)
- `infra/docker`: Deploy e containers

**Backend Internals:**
`main.py`, `api/v1/`, `core/`, `models/`, `schemas/`, `services/`, `workers/`.
Lógica de negócio em `services/`. Tabelas com `tenant_id`, `created_at`, `updated_at`.

## 6. Contrato DevOps e Qualidade
Husky + lint-staged em todo commit. Github Actions para lint, testes (pytest, smoke) e typecheck. OpenAPI deve ser gerado e consumido automaticamente.
