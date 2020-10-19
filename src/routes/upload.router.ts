import { Router } from 'express';
import multer from 'multer';
import uploadController from '../controller/upload.controller';

const uploadRouter =  Router()
const upload = multer({ 
    dest: 'uploads/',
    limits: {
        fileSize: 1000000,
    } 
 })
 

uploadRouter.post('/', upload.single('file'), (req, res) => uploadController.uploadFile(req, res));

export default uploadRouter;