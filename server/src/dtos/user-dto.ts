import mongoose from "mongoose";
import { UserDtoInterface } from "../interfaces/dtos-interfaces";

export default class UserDto {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    isActivated: boolean;
    role: string;
    sex?: string;
    status?: string;

    constructor(model: UserDtoInterface) {
        this._id = model._id;
        this.username = model.username;
        this.email = model.email;
        this.isActivated = model.isActivated;
        this.role = model.role;
        this.sex = model.sex;
        this.status = model.status;
    }
} 