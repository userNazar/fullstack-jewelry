import { UploadedFile } from "express-fileupload";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Product from "../models/product-model";
import fileService from "./file-service";

class ProductService {

    async getAllProducts() {
        const products = await Product.find().exec();

        if (!products || products.length === 0) {
            throw createHttpError(404, 'No products found.');
        }

        return products;
    }

    async getOneProduct(_id: mongoose.Types.ObjectId) {
        const product = await Product.findById(_id);
        if (!product) {
            createHttpError(404, 'Product not found!');
        }

        return product;
    }

    async filterByName(name: string) {
        const regex = new RegExp(name, 'i'); 

        const products = await Product.find({ name: { $regex: regex } });
        if (products.length === 0) {
            createHttpError(404, 'Product not found!');
        }

        return products;
    }

    async createProduct(name: string, price: number, stock: boolean, weight: number, country: string, series: string, ringWidth: string, metalColor: string, ringDesign: string, sex: string, picture?: UploadedFile | UploadedFile[]) {
        const filePath = fileService.saveFile(picture);

        const product = await Product.create({ name, price, stock, weight, country, series, ringWidth, metalColor, ringDesign, sex, picture: filePath });

        if (!product) {
            throw createHttpError(500, 'Some DB troubles!');
        }

        return product;
    }

    async deleteProduct(_id: mongoose.Types.ObjectId) {
        const product = await Product.findById(_id);
        if (!product) {
            throw createHttpError(404, 'Product not found')
        }
        const result = await Product.deleteOne({ _id });

        return result;
    }
}

export default new ProductService();