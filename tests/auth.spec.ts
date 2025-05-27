import { test, expect } from '@playwright/test';

test('Cadastro com dados válidos (caminho feliz)', async ({ page }) => {
  await page.goto('http://localhost:3000/register');

  const emailUnico = `teste+${Date.now()}@exemplo.com`;

  await page.fill('input[name="name"]', 'Usuário Teste');
  await page.fill('input[name="email"]', emailUnico);
  await page.fill('input[name="password"]', '123456');

  await page.click('button[type="submit"]');

  // Ajuste a URL ou mensagem conforme o fluxo real da sua aplicação
  await expect(page).toHaveURL(/.*(login|home)/);
});

test('Cadastro com e-mail vazio (caminho infeliz)', async ({ page }) => {
  await page.goto('http://localhost:3000/register');

  await page.fill('input[name="name"]', 'Usuário Teste');
  await page.fill('input[name="password"]', '123456');
  await page.click('button[type="submit"]');

  // Verifica se alguma mensagem de erro aparece na tela
  const erroEmail = page.getByText(/e-mail.*obrigatório/i);
  await expect(erroEmail).toBeVisible();
});
