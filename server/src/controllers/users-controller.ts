import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { LogInRequestBody, RenewRequestBody, SingUpRequestBody } from "../interfaces/users-interface";
import usersService from "../services/users-service";
import env from "../utils/validateEnv";
import mongoose from "mongoose";


class UserController {

    signUp: RequestHandler<unknown, unknown, SingUpRequestBody, unknown> = async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const { usernameValidated, emailValidated, passwordValidated } = this.validateCredentialSingUp({ username, email, password });

            const { user, accessToken, refreshToken, cart } = await usersService.signUp(usernameValidated, emailValidated, passwordValidated);

            res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.status(201).json({ user, accessToken, refreshToken, cart });
        } catch (error) {
            next(error);
        }
    }

    login: RequestHandler<unknown, unknown, LogInRequestBody, unknown> = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const { emailValidated, passwordValidated } = this.validateCredentialLogin({ email, password });

            const { user, accessToken, refreshToken, cart } = await usersService.login(emailValidated, passwordValidated);

            res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.status(201).json({ user, accessToken, refreshToken, cart });
        } catch (error) {
            next(error);
        }
    } 

    logout: RequestHandler = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            const token = await usersService.logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (error) {
            next(error);
        }
    }

    getUsers: RequestHandler = async (req, res, next) => {
        try {
            const users = await usersService.getAllUsers()
            return res.json(users)
        } catch (error) {
            next(error)
        }
    }

    activate: RequestHandler = async (req, res, next) => {
        try {
            const activationLink = req.params.link;
            await usersService.activate(activationLink);

            return res.redirect(env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }

    refresh: RequestHandler = async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;

            const { user, newRefreshToken, accessToken, cart } = await usersService.refresh(refreshToken);

            res.cookie('refreshToken', newRefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ user, accessToken, refreshToken: newRefreshToken, cart });
        } catch (error) {
            next(error);
        }
    }

    renew: RequestHandler<unknown, unknown, RenewRequestBody, unknown> = async (req, res, next) => {
        try {
            const { _idValidated, usernameValidated, sexValidated, statusValidated } = this.validateCredentialRenew(req.body);

            const user = await usersService.renew(_idValidated, usernameValidated, sexValidated, statusValidated);

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    private validateCredentialSingUp({ username, email, password }: SingUpRequestBody): { usernameValidated: string, emailValidated: string, passwordValidated: string } {
        if (!username || !email || !password) {
            throw createHttpError(400, 'Credentials are missing!');
        }

        return {
            usernameValidated: username,
            emailValidated: email,
            passwordValidated: password
        };
    }

    private validateCredentialLogin({ email, password }: LogInRequestBody): { emailValidated: string, passwordValidated: string } {
        if (!email || !password) {
            throw createHttpError(400, 'Credentials are missing!');
        }

        return {
            emailValidated: email,
            passwordValidated: password
        };
    }

    private validateCredentialRenew({ _id, username, sex, status }: RenewRequestBody): { _idValidated: mongoose.Types.ObjectId, usernameValidated: string, sexValidated: string, statusValidated: string } {
        if (!_id || !username) {
            throw createHttpError(400, 'Credentials are missing!');
        }

        return { _idValidated: _id, usernameValidated: username, sexValidated: sex || '', statusValidated: status || '' };
    }
}


export default new UserController();