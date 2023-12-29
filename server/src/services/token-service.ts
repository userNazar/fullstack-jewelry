import jwt from "jsonwebtoken";
import env from "../utils/validateEnv";
import { UserDtoInterface } from "../interfaces/dtos-interfaces";
import mongoose from "mongoose";
import tokenModel from "../models/token-model";

class TokenService {

    generateTokens(payload: UserDtoInterface) {
        const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, env.JWT_ACCESS_SECRET);

            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, env.JWT_REFRESH_SECRET);

            return userData;
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId: mongoose.Types.ObjectId, refreshToken: string) {
        const tokenData = await tokenModel.findOne({ user: userId }).exec();

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await tokenModel.deleteOne({ refreshToken });

        return tokenData;
    }

    async findToken(refreshToken: string) {
        const tokenData = await tokenModel.findOne({ refreshToken }).exec();
        
        return tokenData;
    }
}

export default new TokenService();