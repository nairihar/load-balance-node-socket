import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import routers from './routers';
import { connectMongo } from './db';

connectMongo();
const app = new express();

app.use(cors()); // open for all
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routers);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`API server running at ${process.env.HOST}:${process.env.PORT}`);
});
