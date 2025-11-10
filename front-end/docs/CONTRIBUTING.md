# Guia de Contribuição

Este documento fornece diretrizes para contribuir com o projeto Borali.

## Fluxo de Trabalho

1. Crie uma branch a partir da `main` com um nome descritivo
2. Faça suas alterações seguindo as convenções do projeto
3. Escreva testes para suas alterações
4. Certifique-se de que todos os testes passam
5. Envie um Pull Request para a branch `main`

## Padrões de Código

### Geral

- Use TypeScript para todo o código
- Siga o estilo de código definido pelo ESLint e Prettier
- Escreva comentários para código complexo
- Mantenha funções pequenas e focadas em uma única responsabilidade

### Linting e Qualidade de Código

O projeto utiliza ESLint com regras específicas para garantir a qualidade do código:

- **Configuração Base**: `eslint.config.mjs` - Configuração padrão para desenvolvimento local
- **Configuração SonarJS**: `eslint.config.sonar.mjs` - Configuração estendida com regras SonarJS para CI

A configuração SonarJS adiciona verificações para:

- Complexidade cognitiva (limite: 15)
- Strings duplicadas (limite: 3 ocorrências)
- Funções idênticas

Para executar o lint com as regras SonarJS localmente:

```bash
ESLINT_CONFIG_PATH=eslint.config.sonar.mjs npx eslint . --ext .js,.jsx,.ts,.tsx
```

> **Nota**: O CI utiliza a configuração SonarJS para garantir um código de alta qualidade. Recomendamos executar esta verificação localmente antes de enviar um PR.

### Componentes React

- Use componentes funcionais com hooks
- Nomeie componentes com PascalCase (ex: `LoginForm.tsx`)
- Coloque cada componente em seu próprio arquivo
- Use props typing com interfaces TypeScript
- Evite props drilling, prefira context ou hooks

```tsx
// Bom
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// Ruim
export function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

### Hooks

- Nomeie hooks com prefixo `use` e camelCase (ex: `useAuth.ts`)
- Mantenha hooks focados em uma única responsabilidade
- Documente os hooks com comentários JSDoc

```tsx
/**
 * Hook para operações de autenticação
 */
export function useAuth() {
  // Implementação
}
```

### Serviços

- Organize serviços por domínio
- Use funções puras quando possível
- Documente as funções de serviço

```tsx
/**
 * Serviço de autenticação
 */
export const authService = {
  /**
   * Login com email e senha
   */
  login: (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    // Implementação
  },
};
```

## Arquitetura

### Adicionando uma Nova Feature

1. Crie uma pasta em `src/features/[nome-da-feature]/`
2. Defina os tipos em `types.ts`
3. Implemente os serviços em `services/service.ts`
4. Crie hooks em `hooks/` para consumir os serviços
5. Implemente os componentes em `components/`

### Regras de Importação

- Features não podem importar de outras features
- Shared pode ser importado por qualquer módulo
- App pode importar de features e shared

```tsx
// Permitido
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";

// Não permitido
import { PlaceCard } from "@/features/places/components/PlaceCard"; // Em um arquivo dentro de features/auth
```

### Gerenciamento de Estado

- Use React Query para dados assíncronos
- Use Zustand apenas para estado de UI e sessão
- Evite useState para estado global

```tsx
// Bom - React Query para dados
export function usePlaces() {
  return useQuery({
    queryKey: ["places"],
    queryFn: () => placesService.getPlaces(),
  });
}

// Bom - Zustand para estado de UI
export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
```

## Testes

### Testes Unitários

- Escreva testes para componentes, hooks e serviços
- Use Jest e React Testing Library
- Foque em comportamento, não em implementação

```tsx
test("LoginForm submits with correct data", async () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "user@example.com" },
  });

  fireEvent.change(screen.getByLabelText(/senha/i), {
    target: { value: "password" },
  });

  fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

  // Verificações
});
```

### Testes E2E

- Escreva testes E2E para fluxos críticos
- Use Playwright
- Foque em jornadas de usuário completas

## Revisão de Código

### Checklist de Revisão

- O código segue os padrões do projeto?
- A arquitetura foi respeitada?
- Os testes foram escritos e passam?
- A documentação foi atualizada?
- O código é legível e manutenível?
- Há duplicação de código que poderia ser evitada?

## Dúvidas?

Se tiver dúvidas sobre como contribuir, entre em contato com a equipe de desenvolvimento.
