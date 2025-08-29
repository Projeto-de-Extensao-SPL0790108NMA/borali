# Arquitetura do Projeto Borali

## Visão Geral

O Borali segue uma arquitetura feature-based com colocation e módulos compartilhados, projetada para escalabilidade e manutenibilidade em projetos de médio/grande porte.

## Princípios Fundamentais

### 1. Organização por Feature (Vertical Slice)

Cada funcionalidade do sistema é encapsulada em sua própria pasta dentro de `src/features/`, contendo todos os componentes, serviços, tipos e hooks relacionados.

### 2. Colocation

Componentes específicos de uma página são colocados próximos ao seu ponto de uso, dentro da pasta da rota correspondente.

### 3. Módulos Compartilhados

Código reutilizável em múltiplas features é organizado em `src/shared/`.

## Estrutura de Diretórios

```
src/
├── app/                      # App Router do Next.js
│   ├── (public)/             # Route group para páginas públicas
│   │   ├── login/            # Rota de login
│   │   │   ├── components/   # Componentes específicos da página
│   │   │   └── page.tsx      # Página de login
│   │   └── register/         # Rota de registro
│   │       ├── components/   # Componentes específicos da página
│   │       └── page.tsx      # Página de registro
│   ├── (dashboard)/          # Route group para páginas autenticadas
│   │   ├── home/             # Rota principal após login
│   │   │   ├── components/   # Componentes específicos da página
│   │   │   └── page.tsx      # Página home
│   │   └── about/            # Outras páginas autenticadas
│   │       └── page.tsx
│   ├── api/                  # API Routes organizadas por domínio
│   │   └── [...]
│   ├── layout.tsx            # Layout raiz
│   └── page.tsx              # Página raiz (redirecionamento)
│
├── features/                 # Organização por features
│   ├── auth/                 # Feature de autenticação
│   │   ├── components/       # Componentes específicos de auth
│   │   ├── services/         # Serviços de autenticação
│   │   │   └── service.ts    # Serviço de auth
│   │   ├── hooks/            # Hooks específicos (useAuth)
│   │   ├── store.ts          # Estado da feature (Zustand)
│   │   └── types.ts          # Tipos da feature
│   │
│   ├── places/               # Feature de lugares/pontos turísticos
│   │   ├── components/       # Componentes de lugares
│   │   ├── services/         # Serviços para API de lugares
│   │   │   └── service.ts    # Serviço de places
│   │   ├── hooks/            # Hooks com React Query
│   │   └── types.ts          # Tipos da feature
│   │
│   └── categories/           # Feature de categorias
│       ├── components/       # Componentes de categorias
│       ├── services/         # Serviços para API de categorias
│       │   └── service.ts    # Serviço de categorias
│       ├── hooks/            # Hooks com React Query
│       └── types.ts          # Tipos da feature
│
└── shared/                   # Módulos compartilhados (enxuto)
    ├── components/           # Design system
    │   ├── ui/               # Componentes básicos (Button, Input, etc.)
    │   └── layout/           # Componentes de layout (Header, Footer, etc.)
    ├── hooks/                # Hooks REALMENTE genéricos
    ├── lib/                  # Bibliotecas e wrappers
    │   └── api/              # Cliente API centralizado
    └── types/                # Tipos globais
        └── api.ts            # Tipos de API (ApiResponse<T>)
```

## Padrões de Implementação

### Gerenciamento de Estado

- **React Query**: Utilizado para todos os dados assíncronos (chamadas de API)
- **Zustand**: Utilizado apenas para estado de UI e sessão

### UI Components

Utilizamos Tailwind CSS + shadcn/ui para componentes de interface, proporcionando:

- Customização flexível
- Consistência visual
- Acessibilidade

### Camada de Serviços

Cada feature possui sua própria camada de serviços que:

- Encapsula a lógica de comunicação com APIs
- Padroniza o formato de respostas
- Centraliza a lógica de negócios

## Fluxo de Dados

1. **Componentes UI**: Consomem dados via hooks
2. **Hooks**: Utilizam React Query para buscar/mutar dados
3. **Serviços**: Encapsulam chamadas de API
4. **API**: Retorna dados para o serviço

## Convenções de Nomenclatura

- **Arquivos de componente**: PascalCase (Button.tsx)
- **Arquivos de hooks**: camelCase (useAuth.ts)
- **Arquivos de serviço**: camelCase (service.ts)
- **Arquivos de tipos**: camelCase (types.ts)

## Regras de Importação

- Features não podem importar de outras features
- Shared pode ser importado por qualquer módulo
- App pode importar de features e shared

## Benefícios da Arquitetura

1. **Escalabilidade**: Novas features podem ser adicionadas sem afetar as existentes
2. **Manutenibilidade**: Código relacionado fica próximo, facilitando manutenção
3. **Testabilidade**: Features isoladas são mais fáceis de testar
4. **Colaboração**: Equipes podem trabalhar em features diferentes sem conflitos
5. **Onboarding**: Novos desenvolvedores podem entender o código mais facilmente

## Exemplos de Uso

### Exemplo: Implementação de Feature

Para adicionar uma nova feature:

1. Crie uma pasta em `src/features/[nome-da-feature]/`
2. Defina os tipos em `types.ts`
3. Implemente os serviços em `services/service.ts`
4. Crie hooks em `hooks/` para consumir os serviços
5. Implemente os componentes em `components/`

### Exemplo: Fluxo de Autenticação

1. Usuário preenche formulário de login (`features/auth/components/LoginForm.tsx`)
2. Hook de autenticação é chamado (`features/auth/hooks/useAuth.ts`)
3. Serviço de autenticação faz requisição à API (`features/auth/services/service.ts`)
4. Token é armazenado no estado global (`features/auth/store.ts`)
5. Usuário é redirecionado para a página inicial
