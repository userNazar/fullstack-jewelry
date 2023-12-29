import mongoose from "mongoose";
import cartModel from "../models/cart-model";
import createHttpError from "http-errors";
import { Product } from "../interfaces/products-interface";



class CartService {

    async createCart(userId: mongoose.Types.ObjectId) {
        const cart = await cartModel.create({ user: userId, cartList: [] });
        if (!cart) {
            throw Error('Some BD troubles!');
        }

        return cart;
    }

    async getCart(userId: mongoose.Types.ObjectId) {
        const cart = await cartModel.findOne({ user: userId }).exec();

        if (!cart) {
            throw Error('Not found Cart (times error handling)');
        }

        return cart;
    }

    async addToCart(userId: mongoose.Types.ObjectId, product: Product) {
        const cart = await cartModel.findOne({ user: userId }).exec();
        if (!cart) {
            throw createHttpError(404, 'Not found Cart (times error handling)');
        }

        cart.cartList.push(product);


        await cart.save();
        return cart;
    }

    async addToWish(userId: mongoose.Types.ObjectId, product: Product) {
        const cart = await cartModel.findOne({ user: userId }).exec();
        if (!cart) {
            throw createHttpError(404, 'Not found Cart (times error handling)');
        }

        cart.wishList.push(product);


        await cart.save();
        return cart;
    }

    async deleteFromWish(userId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId) {
        const cart = await cartModel.findOne({ user: userId }).exec();
        if (!cart) {
            throw createHttpError(404, 'Not found Cart (times error handling)');
        }

        cart.wishList = cart.wishList.filter(prod => prod._id !== productId);

        cart.save();

        return cart;
    }

    async deleteFromCart(userId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId) {
        const cart = await cartModel.findOne({ user: userId }).exec();
        if (!cart) {
            throw createHttpError(404, 'Not found Cart (times error handling)');
        }

        cart.cartList = cart.cartList.filter(prod => prod._id !== productId);

        cart.save();

        return cart;
    }
}

export default new CartService();