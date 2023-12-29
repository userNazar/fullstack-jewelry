import mongoose from "mongoose";
import { Product } from "./products-interface";

export interface AddProductRequestBody {
    userId?: mongoose.Types.ObjectId;
    product: Product;
}

export interface GetCartRequestBody {
    userId?: mongoose.Types.ObjectId;
}

export interface DeleteProductFromRequestBody {
    userId?: mongoose.Types.ObjectId;
    productId?:  mongoose.Types.ObjectId;
}
