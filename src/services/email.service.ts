import nodemailer from 'nodemailer';

class EmailService {
    transporter = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: `${process.env.MAIL}`,
            pass: `${process.env.MAIL_PASSWORD}`
        },
    };
    constructor() {
    }
    
    public sendLicenseEmail(email: string, name: string, pdf: string) {
        const transporter = nodemailer.createTransport(this.transporter);
        const mailOptions = {
            from: `"BA" <${process.env.MAIL}>`,
            to: email,
            subject: `License`,
            text: "License",
            html: this.generateEmailTemplate(name),
            attachments: [{
                filename: 'license.pdf',
                path: `${pdf}`,
                contentType: 'application/pdf'
            }],
        };
        return transporter.sendMail(mailOptions);
    }

    private generateEmailTemplate(name: string): string {
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>License</title>
            </head>
            <body>
                <section id='main-message'>
                    <p>Hello ${name}</p>
                    <p>Here is your License!</p>
                </section>
            </body>
        </html>
        `
    }
}
export default new EmailService();