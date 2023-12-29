import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import UserDto from "../dtos/user-dto";
import userModel from "../models/user-model";
import cartService from "./cart-service";
import mailService from "./mail-service";
import tokenService from "./token-service";

class UserService {

    async signUp(username: string, email: string, password: string) {
        await this.checkExistingUser(username, email);

        const passwordHashed = await bcrypt.hash(password, 10);
        const activationLink = uuidv4();

        const newUser = await this.createUser(username, email, passwordHashed, activationLink);

        await this.sendActivationEmail(newUser.email, activationLink);

        const userDto = new UserDto({ _id: newUser._id, username: username, email: newUser.email, isActivated: newUser.isActivated, role: newUser.role });
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        const cart = await cartService.createCart(userDto._id);

        return {
            ...tokens,
            user: userDto,
            cart
        };
    }

    async login(email: string, password: string) {
        const user = await userModel.findOne({ email }).exec();
        if (!user) {
            throw createHttpError(404, 'User does not exist');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw createHttpError(401, 'Invalid password!');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        const cart = await cartService.getCart(userDto._id);

        return { ...tokens, user: userDto, cart };
    }

    async logout(refreshToken: string) {
        const deletedToken = await tokenService.removeToken(refreshToken);
        return deletedToken;
    }

    async getAllUsers() {
        const users = await userModel.find().exec();
        return users;
    }

    async activate(activationLink: string) {
        const user = await userModel.findOne({ activationLink }).exec();
        if (!user) {
            throw createHttpError(400, 'Incorrect activate link!');
        }

        user.isActivated = true;
        user.save();
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw createHttpError(400, 'No refresh token');
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDB) {
            throw createHttpError(401, 'Unauthorized: No valid refresh token found');
        }

        const user = await userModel.findById(tokenFromDB.user).exec();
        if (!user) {
            throw createHttpError(404, 'Not Found: User not found');
        }

        const cart = await cartService.getCart(user._id);

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return { accessToken: tokens.accessToken, newRefreshToken: tokens.refreshToken, user: userDto, cart };
    }

    async renew(_id: mongoose.Types.ObjectId, username: string, sex: string, status: string) {
        const user = await userModel.findById({ _id }).exec();
        if (!user) {
            throw createHttpError(404, 'Not Found: User not found');
        }

        user.username = username;
        user.sex = sex;
        user.status = status;

        user.save();

        const userDto = new UserDto(user);

        return userDto;
    }


    private async checkExistingUser(username: string, email: string) {
        const userByUsername = await userModel.findOne({ username }).exec();
        if (userByUsername) {
            throw createHttpError(409, 'User with this nickname exists!');
        }

        const userByEmail = await userModel.findOne({ email }).exec();
        if (userByEmail) {
            throw createHttpError(409, 'User with this email exists!');
        }
    }

    private async createUser(username: string, email: string, passwordHashed: string, activationLink: string) {
        const newUser = await userModel.create({
            username,
            email,
            password: passwordHashed,
            activationLink,
            sex: '',
            status: ''
        });

        if (!newUser) {
            throw Error('Some troubles with DB!');
        }
        return newUser;
    }

    private async sendActivationEmail(email: string, activationLink: string) {
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/users/activate/${activationLink}`);
    }
}

export default new UserService();

