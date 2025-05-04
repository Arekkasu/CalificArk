import nodemailer, { Transporter } from "nodemailer";

// SendEmail
// Opciones interfaz

export interface EmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

export class EmailService {
  private transporter: Transporter;
  constructor(
    mailerService: string,
    mailerEmail: string,
    senderEmailPassword: string,
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
