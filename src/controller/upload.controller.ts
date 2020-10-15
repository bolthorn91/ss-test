import { Request, Response } from "express";

class UploadController {
    constructor() {
    }

    public async uploadFile(req: Request, res: Response) {
        try {
            const data = 'test'
            console.log('test')
            if (!data) { throw new Error("No elements found") }
            return res.status(200).send({
                message: `Resources retrieved successfully`,
                data: data
            });
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