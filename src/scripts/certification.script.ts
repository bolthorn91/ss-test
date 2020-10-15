import csvParser from 'csv-parser';
import fs from 'fs'

class CertificationScript {
    constructor() {}

    public initializeCertification() {
        const filesData = this.getCSVs();
    }


    private async getCSVs(){
        console.log(__dirname)
        const directory: string[] | [] = fs.readdirSync(`${__dirname}/../../uploads`)
        const filesDataPromises = directory.map(file => {
            return new Promise((resolve, reject) => {
                let data: any = [];
                fs.createReadStream(`${__dirname}/../../uploads/${file}`)
                .pipe(csvParser())
                .on('data', (row) => data.push(row))
                .on('end', () => {
                    console.log('csv processed')
                    resolve(data)
                });
            }) ;
        })
        return await Promise.all(filesDataPromises);
        
    }

    private createPdf() {

    }

}

export default new CertificationScript();