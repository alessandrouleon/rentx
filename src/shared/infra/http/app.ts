import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { routes } from './routes/index';


import sweggerUI from "swagger-ui-express";
import sweggerFile from "../../../swegger.json";
import createConnection from '@shared/infra/typeorm';

import "../typeorm";
import "../../container";
import { AppError } from '@shared/error/AppError';
import upload from '@config/upload';

createConnection();
const app = express();
app.use(express.json());
app.use(routes);

app.use("/api-docs", sweggerUI.serve, sweggerUI.setup(sweggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    } else {
        return response.status(500).json({
            status: "error",
            message: `Internal server error ${err.message}`
        });
    }
});

export { app }