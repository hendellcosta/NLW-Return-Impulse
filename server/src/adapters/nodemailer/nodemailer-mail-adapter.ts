import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';
import { type } from "os";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "58a25d0bec36d8",
      pass: "3c80dcdf7d0976"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Team FeedGet <hi@feedget.com>',
             to: 'Hendell Costa <hendellpetersen@gmail.com>',
             subject: subject,
             html: body,
         })
    }
}

//[
    //`<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
    //`<p>Feedback Type: ${type}</p>`,
    //`<p>Comment: ${comment}</p>`,
    //`</div>`
    //].join('')