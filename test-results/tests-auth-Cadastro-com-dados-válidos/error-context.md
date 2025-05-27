# Test info

- Name: Cadastro com dados válidos
- Location: /home/kamilakubo/borali-web/tests/auth.spec.ts:3:5

# Error details

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="name"]')

    at /home/kamilakubo/borali-web/tests/auth.spec.ts:6:14
```

# Page snapshot

```yaml
- banner:
  - link "Logo":
    - /url: /
    - img "Logo"
- img "Logo"
- text: Email
- textbox "Email"
- text: Senha
- textbox "Senha"
- button "Entrar"
- heading "404" [level=1]
- heading "This page could not be found." [level=2]
- status:
  - img
  - text: Static route
  - button "Hide static indicator":
    - img
- alert
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Cadastro com dados válidos', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000/register');
   5 |
>  6 |   await page.fill('input[name="name"]', 'Teste Playwright');
     |              ^ Error: page.fill: Test timeout of 30000ms exceeded.
   7 |   await page.fill('input[name="email"]', 'playwright+' + Date.now() + '@teste.com');
   8 |   await page.fill('input[name="password"]', '123456');
   9 |
  10 |   await page.click('button[type="submit"]');
  11 |
  12 |   // Altere a URL ou condição de sucesso abaixo conforme sua aplicação
  13 |   await expect(page).toHaveURL(/.*(login|home)/);
  14 | });
  15 |
  16 | test('Login com dados válidos', async ({ page }) => {
  17 |   await page.goto('http://localhost:3000/login');
  18 |
  19 |   await page.fill('input[type="email"]', 'seuemail@teste.com'); // Substitua por usuário já cadastrado
  20 |   await page.fill('input[type="password"]', '123456');
  21 |
  22 |   await page.click('button[type="submit"]');
  23 |
  24 |   await expect(page).toHaveURL(/.*(home|dashboard)/);
  25 | });
  26 |
```