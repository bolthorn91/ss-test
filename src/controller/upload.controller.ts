import { Request, Response } from "express";

class UploadController {
    constructor() {
    }

    public async uploadFile(req: Request, res: Response) {
        try {
        if (!req.file) { throw new Error("element not uploaded") }
            return res.status(200).send({
                message: `Resources retrieved successfully`,
                data: req.file
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