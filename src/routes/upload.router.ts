import { Router } from 'express';
import multer from 'multer';
import uploadController from '../controller/upload.controller';

const uploadRouter =  Router()
const upload = multer({ dest: 'uploads/' })

// uploadRouter.post('/', upload.single('file'), (req, res) => uploadController.uploadFile(req, res));
uploadRouter.post('/', upload.single('file'));

export default uploadRouter;