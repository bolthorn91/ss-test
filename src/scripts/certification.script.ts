import csvParser from 'csv-parser';
import fs from 'fs'
import * as html2pdf from 'html-pdf';
import emailService from '../services/email.service';
interface user {
    name: string;
    license: string;
    email: string;
}

interface userWithPdf extends user {
    pdfPath: string;
}


class CertificationScript {
    constructor() {}

    public async initializeCertification() {
        const users = await this.getCSVs();
        const usersWithPdfPath: userWithPdf[] = await Promise.all(users.map(async user => ({...user, pdfPath: await this.getLicensePdfPath(user.name)})));
        const sentmails = await this.sendMails(usersWithPdfPath);
        console.log({sentmails})
    }


    private async getCSVs(): Promise<user[]> {
        const directory: string[] | [] = fs.readdirSync(`${__dirname}/../../uploads`)
        const filesDataPromises = directory.map(file => {
            return new Promise((resolve, reject) => {
                let data: any = [];
                fs.createReadStream(`${__dirname}/../../uploads/${file}`)
                // @ts-ignore
                .pipe(csvParser({ separator: ';', from_line: 2 }))
                .on('headers', (headers) => {
                    console.log(`First header: ${headers[0]}`)
                  })
                .on('data', (row) => data.push(row))
                .on('end', () => {
                    console.log('csv processed')
                    resolve(data)
                });
            }) ;
        })
        const rawData = (await Promise.all(filesDataPromises)); 
        return rawData.reduce((acc: any[], current: any) => [...acc, ...current], [])
    }

    private getLicensePdfPath(user: any): Promise<string> {
        const content = `
        <!doctype html>
            <html>
            <head>
                    <meta charset="utf-8">
                    <title>License</title>
                    <style>
                        h1 {
                            color: green;
                        }
                    </style>
                </head>
                <body>
                    <h1>Here is your license, good job!</h1>
                </body>
            </html>
        `;

        return new Promise((resolve) => {
            html2pdf.create(content).toFile(`${__dirname}/../../pdfs/${user}_${Date.now()}.pdf`, (err, res) => {
                if (err){
                        // handle error;
                        console.log(err);
                    }
                console.log({res});
                resolve(res.filename)
            });
        }) 
    }

    private async sendMails(usersWithPdfPath: userWithPdf[]) {
        try {
            const sentMails = await Promise.all(usersWithPdfPath.map(user => emailService.sendLicenseEmail(user.email, user.name, user.pdfPath)))
            if (sentMails){
                return true;
            }
            return false;
        } catch (e) {
            // handle error;
        }
    }
}

export default new CertificationScript();