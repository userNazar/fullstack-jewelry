import { Request, Response } from "express";
import { isHttpError } from "http-errors";

class IError {
    static handle(error: unknown, req: Request, res: Response) {
        let messageError = "Some unknown trouble!";
        let statusCode = 500;

        if (isHttpError(error)) {
            statusCode = error.status;
            messageError = error.message;
        }

        console.error(error);
        res.status(statusCode).json({ error: messageError });
    }
}

export default IError;