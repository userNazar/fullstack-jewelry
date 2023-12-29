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
            return next(createHttpError(401, "Authorization Error"));
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return next(createHttpError(401, "Authorization Error"));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData || typeof userData === 'string') {
            return next(createHttpError(401, "Authorization Error"));
        }


        const userRole = userData.role;


        if (userRole === "ADMIN") {
            req.user = userData as JwtPayload;
            next();
        } else {
            req.user = userData as JwtPayload;
            next(createHttpError(403, "Authorization Error"));
        }
    } catch (error) {
        next(createHttpError(500, "Internal Server Error."));
    }
}
