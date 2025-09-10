# Borali Web

Aplicação web para explorar lugares em Manaus.

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- Zustand
- shadcn/ui

## Estrutura do Projeto

O projeto segue uma arquitetura feature-based + colocation + shared modules, projetada para escalabilidade e manutenibilidade.

Para mais detalhes sobre a arquitetura, consulte [ARCHITECTURE.md](./ARCHITECTURE.md).

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Iniciar servidor de produção
npm start
```

## Desenvolvimento

### Estrutura de Diretórios

```
src/
├── app/                      # App Router do Next.js
│   ├── (public)/             # Route group para páginas públicas
│   ├── (dashboard)/          # Route group para páginas autenticadas
│   ├── api/                  # API Routes
│   ├── layout.tsx            # Layout raiz
│   └── page.tsx              # Página raiz
│
├── features/                 # Organização por features
│   ├── auth/                 # Feature de autenticação
│   ├── places/               # Feature de lugares
│   └── categories/           # Feature de categorias
│
└── shared/                   # Módulos compartilhados
    ├── components/           # Design system
    ├── hooks/                # Hooks genéricos
    ├── lib/                  # Bibliotecas e wrappers
    └── types/                # Tipos globais
```

### Convenções

- **Nomenclatura**: PascalCase para componentes, camelCase para hooks, serviços e tipos
- **Imports**: Features não podem importar de outras features, apenas de shared
- **Estado**: React Query para dados assíncronos, Zustand para estado de UI/sessão

## Contribuição

Para contribuir com o projeto, consulte [CONTRIBUTING.md](./CONTRIBUTING.md).

## Testes

```bash
# Executar testes unitários
npm test

# Executar testes E2E
npx playwright test

# Executar testes E2E com servidor de produção
npx start-server-and-test "npm run start" http://localhost:3000 "npx playwright test"
```

## Integração Contínua (CI)

Este projeto utiliza GitHub Actions para CI com uma arquitetura otimizada em quatro jobs:

### Setup Environment

- Configuração inicial do ambiente
- Instalação de dependências
- Configuração de cache

### Verificação de Segurança

- Auditoria de vulnerabilidades (críticas e altas)
- Verificação de dependências desatualizadas

### Qualidade de Código

- Lint com regras SonarJS avançadas
- Verificação de tipos TypeScript
- Testes unitários com cobertura
- Detecção de duplicação de código (threshold: 5%)
- Preparado para verificação de cobertura mínima (70%)

### Build e Testes E2E

- Build de produção
- Testes E2E contra o build de produção

Esta arquitetura com dependências explícitas garante que o ambiente seja configurado apenas uma vez, jobs de verificação rodem em paralelo para feedback rápido, e testes E2E só sejam executados se a qualidade do código for aprovada.

Para mais detalhes sobre o CI, consulte [CI.md](./docs/CI.md).

## Qualidade de Código

Para garantir a qualidade do código, utilizamos:

```bash
# Lint com regras SonarJS
ESLINT_CONFIG_PATH=eslint.config.sonar.mjs npx eslint . --ext .js,.jsx,.ts,.tsx

# Verificação de duplicação de código
npx jscpd src --ignore "node_modules/**,**/*.test.*,**/*.spec.*,.next/**,public/**" --threshold 5

# Verificação de dependências desatualizadas
npm outdated

# Verificação de tipos
npx tsc --noEmit
```
