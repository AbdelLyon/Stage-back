interface MailOptions {
   from: string;
   to: string;
   subject: string;
   text?: string;
   html?: string
}
export interface TemplateOptions {
   mailOptions: MailOptions;
   template: string;
   data: { [key: string]: string }
}