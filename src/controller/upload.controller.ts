import csvParser from "csv-parser";
import { Request, Response } from "express";
import * as fs from "fs";
import multer from "multer";
import multerService from "../sevices/multer.service";

class UploadController {
    constructor() {
    }

    public async uploadFile(req: Request, res: Response) {
        try {
            console.log(req.file)
            // let data: any = [];
            // fs.createReadStream('upload/file')
            // .pipe(csvParser())
            // .on('data', (row) => data.push(row))
            // .on('end', () => {
            //     console.log('csv processed')
            //     if (!data) { throw new Error("No elements found") }
            //     return res.status(200).send({
            //         message: `Resources retrieved successfully`,
            //         data
            //     });
            // })
        } catch (e) {
            this.handleError(res, e)
        }
    }

    public handleError(res: Response, err: any) {
        console.log(err);
        return res.status(500).send({ message: `${err.code} - ${err.message}` });
    }
}
export default new UploadController();