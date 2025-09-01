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
npm run test:e2e
```
