import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fc790a88e5d0ed",
    pass: "7786ee6c547023",
  },
});

export class NodeMailerAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Team Feedget <suporte@feedget.com>",
      to: "Vinícius Oliveira <vinicius.alexandre01@hotmail.com>",
      subject,
      html: body,
    });
  }
}
