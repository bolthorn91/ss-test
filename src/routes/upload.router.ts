import { Router } from 'express';
import uploadController from '../controller/upload.controller';

const uploadRouter =  Router()

uploadRouter.post('/', (req, res) => uploadController.uploadFile(req, res));

export default uploadRouter;