import { InferSchemaType, Schema, model } from "mongoose";

export enum Role {
    "USER" = "USER",
    "ADMIN" = 'ADMIN',
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    role: { type: String, required: true, default: Role.USER },
    sex: { type: String, required: false, default: '' },
    status: { type: String, required: false, default: '' }
}, { timestamps: true });

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);