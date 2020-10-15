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
        const transporter = nodemailer.createTransport({...this.transporter,
            attachments: [{
                filename: 'license.pdf',
                path: `${__dirname}/../../pdfs/${name}_${Date.now()}.pdf`,
                contentType: 'application/pdf'
            }],
        });
        console.log({transporter})
        const mailOptions = {
            from: `"BA" <${process.env.MAIL}>`,
            to: email,
            subject: `License`,
            text: "License",
            html: this.generateEmailTemplate()
        };
        return transporter.sendMail(mailOptions);
    }

    private generateEmailTemplate(): string {
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>License</title>
            </head>
            <body>
                <section id='main-message'>This is your License</section>
            </body>
        </html>
        `
    }
}
export default new EmailService();