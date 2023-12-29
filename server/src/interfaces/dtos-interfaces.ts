import mongoose from "mongoose";

export interface UserDtoInterface {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    isActivated: boolean;
    role: string;
    sex?: string;
    status?: string
}