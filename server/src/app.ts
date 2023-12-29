import "dotenv/config";
import env from "./utils/validateEnv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import ErrorHandler from "../middlewares/error-middleware";
import cookieParser from "cookie-parser";
import router from "./routes/router";

const app = express(); 

app.use(express.static('static'));
app.use(cors({
    credentials: true, 
    origin: env.CLIENT_URL 
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({}));
app.use('/', router);

app.get('/', (req, res) => {
    res.json({ message: 'works' })
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.handle(error, req, res);
});


export default app;