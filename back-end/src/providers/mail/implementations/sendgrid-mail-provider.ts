import sgMail from '@sendgrid/mail'
import { env } from '@/env'
import { MailProvider } from '../mail-provider'

export class SendGridMailProvider implements MailProvider {
  constructor() {
    sgMail.setApiKey(env.SENDGRID_API_KEY)
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    try {
      await sgMail.send({
        to,
        from: env.SENDGRID_MAIL_FROM,
        subject,
        html: body,
      })
    } catch (err) {
      console.error(err)
    }
  }
}
