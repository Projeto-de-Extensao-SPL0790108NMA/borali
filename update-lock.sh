#!/bin/bash

# Script para atualizar o package-lock.json para sincronizar com o package.json

echo "Atualizando package-lock.json..."
npm install --package-lock-only --ignore-scripts

echo "Verificando se há alterações no package-lock.json..."
if git diff --quiet package-lock.json; then
  echo "Nenhuma alteração no package-lock.json."
else
  echo "package-lock.json foi atualizado. Por favor, faça commit das alterações."
  echo "Você pode usar o seguinte comando:"
  echo "git add package-lock.json && git commit -m \"chore: atualiza package-lock.json para sincronizar com package.json\""
fi
