import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import cors from 'cors';
import apiRouter from "./routes/index.router";

const { BASE_URL, MONGO_URL, DB_PASSWORD, DB_USER, MONGO_DB_NAME, MODE } = process.env;
const app = express();
mongoose.connect(`${BASE_URL}${DB_USER}:${encodeURI(DB_PASSWORD as string)}${MONGO_URL}/${MONGO_DB_NAME}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())

app.use('/api', apiRouter)

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Running at http://localhost:${port}`))