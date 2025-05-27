# Test info

- Name: Login com dados válidos
- Location: /home/kamilakubo/borali-web/tests/auth.spec.ts:16:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)

Locator: locator(':root')
Expected pattern: /.*(home|dashboard)/
Received string:  "http://localhost:3000/login"
Call log:
  - expect.toHaveURL with timeout 5000ms
  - waiting for locator(':root')
    9 × locator resolved to <html lang="en">…</html>
      - unexpected value "http://localhost:3000/login"

    at /home/kamilakubo/borali-web/tests/auth.spec.ts:24:22
```

# Page snapshot

```yaml
- banner:
  - link "Logo":
    - /url: /
    - img "Logo"
- img "Logo"
- text: Email
- textbox "Email": seuemail@teste.com
- text: Senha
- textbox "Senha": "123456"
- paragraph: Erro ao fazer login
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
   6 |   await page.fill('input[name="name"]', 'Teste Playwright');
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
> 24 |   await expect(page).toHaveURL(/.*(home|dashboard)/);
     |                      ^ Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)
  25 | });
  26 |
```