import nodemailer = require('nodemailer');
import { Injectable } from '@nestjs/common';
import { TemplatingView } from './templating-view';
import { TemplateOptions } from 'src/interface/mail.interface';

@Injectable()
export class SendMailService {
  private transporter;
  private templating?: TemplatingView;
  constructor() {
    this.config();
    this.templating = new TemplatingView();
  }

  private config() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: { user: process.env.MAIL_AUTH_USER, pass: process.env.MAIL_AUTH_PASSWORD },
    });
  }

  public send(options: TemplateOptions): Promise<{ error: boolean; response: string }> {
    return new Promise<{ error: boolean; response: string }>(
      (resolve, reject) => {
        const logo = `/static/img/logo.png`;
        const artisanNetwork = `/static/img/artisan-network.jpg`;
        this.templating
          .getTemplate(options.template, { ...options.data, logo, artisanNetwork })
          .then((templateStr) => {
            options.mailOptions.html = templateStr;
            this.transporter.sendMail(
              options.mailOptions,
              (error: any, info: any) => {
                if (error != null) {
                  console.log('Erreur mail', error);
                  reject(error);
                } else {
                  console.log('Send mail', info.response);
                  resolve({ error: error != null, response: info.response });
                }
              },
            );
          })
          .catch((error) => {
            // tslint:disable-next-line:no-console
            console.log(error);
          });
      },
    );
  }
}
