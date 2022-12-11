import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { routes } from './routes';

import sweggerUI from "swagger-ui-express";
import sweggerFile from "./swegger.json";

import "./database";
import "./shared/container";
import { AppError } from 'error/AppError';

const app = express();

app.use(express.json());

app.use(routes);

app.use("/api-docs", sweggerUI.serve, sweggerUI.setup(sweggerFile));

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

app.listen(3333, () => console.log('Running on port 3333'));