import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL, // Reemplaza con tu correo
        pass: process.env.APP_EMAIL_PASSWORD, // Reemplaza con tu contraseña de aplicaciones
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.EMAIL, // Reemplaza con tu correo
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
