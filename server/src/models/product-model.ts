import { InferSchemaType, Schema, model } from "mongoose";

const productSchema = new Schema({
    picture: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Boolean, required: true },
    weight: { type: Number, required: true },
    country: { type: String, required: true },
    series: { type: String, required: true },
    ringWidth: { type: Number, required: true },
    metalColor: { type: String, required: true },
    ringDesign: { type: String, required: true },
    sex: { type: String }
});

type Product = InferSchemaType<typeof productSchema>;

export default model<Product>('Product', productSchema);