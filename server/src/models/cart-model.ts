import { Schema, model, InferSchemaType } from "mongoose";

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cartList: [],
    wishList: [],
});

export type Cart = InferSchemaType<typeof cartSchema>;

export default model<Cart>('Cart', cartSchema);