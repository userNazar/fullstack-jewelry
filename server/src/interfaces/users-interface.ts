import mongoose from "mongoose";


export interface SingUpRequestBody {
    username?: string;
    email?: string;
    password?: string;
}

export interface LogInRequestBody {
    email?: string;
    password?: string;
}


export interface RenewRequestBody {
    _id?: mongoose.Types.ObjectId;
    username?: string;
    sex?: string;
    status?: string;
}