import nodemailer, { Transporter } from "nodemailer";
import env from "../utils/validateEnv";
import { Product } from "../interfaces/products-interface";


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

    async sendContactEmail(to: string, from: string, firstName: string, lastName: string, letter: string) {
        try {
            await this.transporter.sendMail({
                from: env.SMTP_MAIL,
                to,
                subject: 'Activating to ' + env.API_URL,
                text: '',
                html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">Letter from ${firstName} ${lastName},</h2>
                <p>${letter}</p>
                <br>
                <p>Best regards</p>
                <p>Contact us part!</p>
                <hr style="border: 1px solid #ddd;">
                <p style="font-size: 0.9em; color: #888;">
                    This message was sent by ${from}.
                </p>
            </div>
        `
            })
        } catch (error) {
            console.log(error);
        }
    }

    async sendConfirmBuying(to: string, products: Array<Product>) {
        try {
            const productRows = products.map(product => `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.name}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.price}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.stock ? 'In Stock' : 'Out of Stock'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.weight} g</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.country}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.series}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.ringWidth}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.metalColor}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.ringDesign}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.sex}</td>
                </tr>
            `).join('');

            await this.transporter.sendMail({
                from: env.SMTP_MAIL,
                to,
                subject: 'Purchase Confirmation - Activate Your Account',
                text: '',
                html: `
                <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: 0 auto; border-radius: 8px; border: 1px solid #ddd;">
                    <h1 style="text-align: center; color: #4CAF50;">Purchase Confirmed</h1>
                    <p style="font-size: 16px; line-height: 1.5; color: #333;">Dear Customer,</p>
                    <p style="font-size: 16px; line-height: 1.5; color: #333;">Thank you for your purchase! Here are the details of the products you purchased:</p>
                    <div style="overflow-x: auto; margin-top: 20px;">
                        <table style="border-collapse: collapse; width: 100%; min-width: 800px;">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Name</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Price</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Stock</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Weight</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Country</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Series</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Ring Width</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Metal Color</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Ring Design</th>
                                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Sex</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${productRows}
                            </tbody>
                        </table>
                    </div>
                    <p style="font-size: 14px; line-height: 1.5; color: #777; margin-top: 30px; text-align: center;">If you did not make this purchase, please ignore this email.</p>
                </div>
            `
            });
        } catch (error) {
            console.log(error);
        }
    }
}


export default new MailService();