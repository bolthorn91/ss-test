import csvParser from 'csv-parser';
import fs from 'fs'
import * as html2pdf from 'html-pdf';
interface usersWithPdf {
    user: string;
    license: string;
    email: string;
    pdfPath: string;
}

class CertificationScript {
    constructor() {}

    public async initializeCertification() {
        const filesData = await this.getCSVs();
        const users = filesData.reduce((acc: any[], current: any) => [...acc, ...current], [])
        const usersWithPdfPath: usersWithPdf[] = await Promise.all(users.map(user => ({...user, pdf: this.getLicensePdfPath(user.name)})));
    }


    private async getCSVs(){
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
        return (await Promise.all(filesDataPromises));
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
                        console.log(err);
                    }
                console.log({res});
                resolve(res.filename)
            });
        }) 
    }
}

export default new CertificationScript();