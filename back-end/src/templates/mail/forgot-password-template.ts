interface ForgotPasswordTemplateParams {
  username: string
  code: string
}

export function forgotPasswordTemplate({
  username,
  code,
}: ForgotPasswordTemplateParams): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Redefinir sua senha</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F9F9F9; font-family: Arial, Helvetica, sans-serif;">
        <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color:#FFFFFF; margin: 24px auto; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="text-align:left;">
              <h1>
                <img src="https://borali-assets.s3.us-east-1.amazonaws.com/logo.png" alt="Borali Logo" width="120" style="opacity:0.8;">
              </h1>
              <h2 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 24px 0;">Redefinir sua senha</h2>

              <p style="font-size:16px; color:#111827; margin: 0 0 8px 0;">
                <strong>Olá, ${username}</strong>
              </p>

              <p style="font-size: 16px; color: #111827; margin: 0 0 24px 0;">
                Alguém solicitou uma nova senha para a seguinte conta no Borali:
              </p>

              <hr style="border:none; border-top:1px solid #D1D5DB; margin: 24px 0;" />

              <p style="font-size: 16px; color: #111827; margin: 0 0 16px 0;">
                <strong>Código de verificação:</strong>
                <span style="font-weight: 700; letter-spacing: 2px; color: #111827;">
                  ${code}
                </span>
              </p>

              <hr style="border: none; border-top: 1px solid #D1D5DB; margin: 24px 0;" />

              <p style="font-size: 15px; color: #111827; margin: 0;">
                Se você não fez essa solicitação, ignore este e-mail.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}
