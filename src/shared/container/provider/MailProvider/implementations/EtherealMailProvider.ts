import { inject, injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import Handlebars from "handlebars";
import fs from "fs";


@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transport = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transport;
        }).catch((err) => console.error(err));
    }


    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
       const templateFileContent = fs.readFileSync(path).toString("utf-8");
       const templateParse = Handlebars.compile(templateFileContent); 
       const templateHTML = templateParse(variables);

        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com.br>",
            subject,
            html: templateHTML,
        });

        console.log("Message sent: %s", message.messageId);
        console.log("Proview URL: %s", nodemailer.getTestMessageUrl(message));


    }


}

export { EtherealMailProvider }