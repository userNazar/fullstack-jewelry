import { Schema, model, InferSchemaType } from "mongoose";

const tokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true }
});

type Token = InferSchemaType<typeof tokenSchema>;

export default model<Token>("Token", tokenSchema);