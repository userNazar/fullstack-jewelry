import { RequestHandler } from "express";
import mailService from "../services/mail-service";
import { CreateContactMailBody } from "../interfaces/mail.interface";
import createHttpError from "http-errors";


class MailController {
    sendContactMail: RequestHandler<unknown, unknown, CreateContactMailBody, unknown> = async (req, res, next) => {
        try {
            const { to, from, firstName, lastName, letter } = req.body;
            
            if (!to || typeof to !== "string" || !to.includes("@")) {
                throw createHttpError(400, "'to' is missing or invalid (must be a valid email)");
            }
            if (!from || typeof from !== "string" || !from.includes("@")) {
                throw createHttpError(400, "'from' is missing or invalid (must be a valid email)");
            }
            if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
                throw createHttpError(400, "'firstName' is missing or invalid (must be a non-empty string)");
            }
            if (!lastName || typeof lastName !== "string" || lastName.trim().length === 0) {
                throw createHttpError(400, "'lastName' is missing or invalid (must be a non-empty string)");
            }
            if (!letter || typeof letter !== "string" || letter.trim().length === 0) {
                throw createHttpError(400, "'letter' is missing or invalid (must be a non-empty string)");
            }
            await mailService.sendContactEmail(to, from, firstName, lastName, letter);

            res.status(201);
        } catch (error) {
            next(error);
        }
    }
}

export default new MailController();