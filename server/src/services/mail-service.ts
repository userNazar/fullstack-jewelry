import nodemailer, { Transporter } from "nodemailer";
import env from "../utils/validateEnv";


class MailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.SMTP_HOST,
            port: env.SMTP_PORT,
            secure: false,
            auth: {
                user: env.SMTP_MAIL,
                pass: env.SMTP_PASSWORD,
            },
        })
    }

    async sendActivationMail(to: string, link: string) {
        try {
            await this.transporter.sendMail({
                from: env.SMTP_MAIL,
                to,
                subject: 'Activating to ' + env.API_URL,
                text: '',
                html: `
                <div>
                    <h1>For activating press link.</h1>
                    <a href='${link}'>${link}</a>
                </div>
            `
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export default new MailService();