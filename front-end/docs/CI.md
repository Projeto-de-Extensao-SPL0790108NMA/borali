# Fluxo de CI

Este projeto utiliza GitHub Actions para Integração Contínua (CI). O fluxo de trabalho é executado automaticamente em pull requests e pushes para as branches `main` e `develop`.

## Arquitetura do CI

O workflow está organizado em uma estrutura otimizada com dependências entre jobs:

1. **Setup Environment**: Job inicial que configura o ambiente e instala dependências
2. **Verificação de Segurança**: Auditoria de vulnerabilidades e dependências desatualizadas
3. **Qualidade de Código**: Lint, verificação de tipos, testes unitários e análise de duplicação
4. **Build e Testes E2E**: Compilação da aplicação e testes end-to-end (executado apenas após a verificação de qualidade)

Esta arquitetura com dependências explícitas garante que:

- O ambiente seja configurado apenas uma vez
- Jobs de verificação rodem em paralelo para feedback rápido
- Testes E2E só sejam executados se a qualidade do código for aprovada

## Etapas do Fluxo de Trabalho

### Job: Setup Environment

1. **Configuração do Ambiente**:
   - Checkout do repositório
   - Configuração do Node.js
   - Instalação de dependências
   - Configuração de cache

### Job: Verificação de Segurança

1. **Auditoria de Segurança**: Análise inteligente de vulnerabilidades que:

   - Usa `jq` para parsing robusto do JSON de saída do npm audit
   - Exibe um relatório detalhado das vulnerabilidades encontradas
   - Falha o build apenas se encontrar vulnerabilidades críticas ou altas

2. **Verificação de Dependências Desatualizadas**:

   - Identifica pacotes que precisam ser atualizados
   - Não bloqueia o build, apenas informa (modo warning)

3. **Detecção de Segredos com detect-secrets**:
   - Ferramenta simples e eficaz para escanear o código em busca de credenciais e tokens
   - Escopo limitado ao diretório `src/` para melhor performance
   - Timeout de 5 minutos para evitar travamentos no pipeline
   - Configurada para reportar segredos potenciais sem interromper o CI (modo informativo)
   - Permite identificar problemas de segurança sem bloquear o fluxo de desenvolvimento

### Job: Qualidade de Código

1. **Lint**: Verifica a qualidade do código usando ESLint com o plugin sonarjs para detectar:

   - Código duplicado
   - Funções muito grandes
   - Branches redundantes
   - Complexidade excessiva
   - Switches pequenos
   - Branches duplicados

2. **Verificação de Tipos**: Verifica os tipos TypeScript para detectar erros relacionados a tipos.

3. **Testes Unitários**:

   - Executa testes unitários com geração de relatório de cobertura
   - Usa `--passWithNoTests` para permitir a execução mesmo sem testes configurados

4. **Detecção de Duplicação de Código**:

   - Utiliza jscpd para detectar duplicação de código
   - Configurado com threshold de 5% para reduzir falsos positivos
   - Foco apenas no diretório `src` para análise mais relevante

5. **Verificação de Cobertura** (preparado para o futuro):
   - Configurado para verificar cobertura mínima de 70%
   - Comentado até que testes unitários sejam implementados

### Job: Build e Testes E2E

1. **Build da Aplicação**: Compila a aplicação para produção.

2. **Testes E2E**: Executa testes usando Playwright com as seguintes etapas:
   - Inicia o servidor Next.js em modo de produção (`npm run start`)
   - Aguarda o servidor estar disponível
   - Executa os testes Playwright contra o build de produção

## Otimizações de Performance

O workflow inclui várias otimizações para melhorar a velocidade e eficiência:

- **Variáveis de Ambiente Compartilhadas**: Centraliza configurações como versão do Node.js
- **Job de Setup Dedicado**: Configura o ambiente uma única vez
- **Dependências Entre Jobs**: Garante a ordem correta de execução sem redundância
- **Cache de Dependências**: Utiliza o cache do npm para acelerar a instalação
- **Cache de Browsers Playwright**: Armazena em cache os browsers para evitar downloads repetidos
- **Instalação Otimizada**: Usa `--only-shell` para instalação mais rápida do Playwright
- **Parsing Robusto**: Usa `jq` para análise confiável de JSON
- **Instalação Local de Dependências**: Cada job instala suas próprias dependências para garantir consistência
- **Mensagens de Diagnóstico**: Inclui mensagens detalhadas para facilitar a depuração
- **Uso de npm install**: Usa `npm install` em vez de `npm ci` para lidar com possíveis inconsistências entre package.json e package-lock.json

## Arquivos de Configuração

- **ESLint com SonarJS**: A configuração está em `eslint.config.sonar.mjs`
- **Workflow CI**: O fluxo de trabalho é definido em `.github/workflows/ci.yml`

## Sincronização de Dependências

O CI requer que o `package.json` e o `package-lock.json` estejam sincronizados. Se você atualizar as dependências no `package.json`, é importante atualizar também o `package-lock.json` antes de enviar as alterações.

Para facilitar esse processo, você pode usar os scripts fornecidos:

- No Windows: execute `update-lock.bat`
- No Linux/Mac: execute `./update-lock.sh`

Esses scripts irão:

1. Atualizar o `package-lock.json` para sincronizar com o `package.json` (usando `--ignore-scripts` para evitar problemas com hooks)
2. Verificar se houve alterações
3. Sugerir um comando para fazer commit das alterações

> **Nota**: Usamos a flag `--ignore-scripts` para evitar a execução de scripts como `prepare` durante a atualização do package-lock.json. Isso previne problemas com hooks do Git que podem não estar disponíveis em todos os ambientes.

## Testes Locais

Você pode executar as mesmas verificações localmente antes de enviar suas alterações:

```bash
# Auditoria de segurança
npm audit

# Verificar dependências desatualizadas
npm outdated

# Executar lint com regras SonarJS
ESLINT_CONFIG_PATH=eslint.config.sonar.mjs npx eslint .

# Executar verificação de tipos
npx tsc --noEmit

# Executar testes unitários com cobertura
npm test -- --coverage --passWithNoTests

# Build da aplicação
npm run build

# Executar testes E2E com servidor de produção
npx start-server-and-test "npm run start" http://localhost:3000 "npx playwright test"

# Verificar duplicação de código
npx jscpd src --ignore "node_modules/**,**/*.test.*,**/*.spec.*,.next/**,public/**" --threshold 5
```
