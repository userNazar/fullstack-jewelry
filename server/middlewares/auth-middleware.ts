import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { JwtPayload } from "jsonwebtoken";
import tokenService from "../src/services/token-service";

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export default function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(createHttpError(401, "Authorized Error"));
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return next(createHttpError(401, "Authorized Error"));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(createHttpError(401, "Authorized Error"));
        }

        req.user = userData;
        next();
    } catch (error) {
        next(createHttpError(401, "Authorized Error"));
    }
}