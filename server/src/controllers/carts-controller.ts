import { RequestHandler } from "express";
import { AddProductRequestBody, DeleteProductFromRequestBody, GetCartRequestBody } from "../interfaces/carts-interface";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import cartService from "../services/cart-service";
import { Product } from "../interfaces/products-interface";



class CartsControllers {

    getCart: RequestHandler<unknown, unknown, GetCartRequestBody> = async (req, res, next) => {
        try {
            const { userId } = req.body;
            const { userIdValidated } = this.validationGetCart({ userId });

            const cart = await cartService.getCart(userIdValidated);

            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    addProductCart: RequestHandler<unknown, unknown, AddProductRequestBody, unknown> = async (req, res, next) => {
        try {
            const { userId, product } = req.body;
            const { userIdValidated, productValidated } = this.productsPropertiesAddProduct({ userId, product });

            const cart = await cartService.addToCart(userIdValidated, productValidated);

            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    addProductWish: RequestHandler<unknown, unknown, AddProductRequestBody, unknown> = async (req, res, next) => {
        try {
            const { userId, product } = req.body;
            const { userIdValidated, productValidated } = this.productsPropertiesAddProduct({ userId, product });

            const cart = await cartService.addToWish(userIdValidated, productValidated);

            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    removeProductCart: RequestHandler<unknown, unknown, DeleteProductFromRequestBody, unknown> = async (req, res, next) => {
        try {
            const { userId, productId } = req.body;
            if (!userId || !productId) {
                throw createHttpError(400, 'Credentials is missing!')
            }

            const cart = await cartService.deleteFromCart(userId, productId);

            res.status(200).json(cart);
        } catch (error) {
            next(error); 
        }
    }

    removeProductWish: RequestHandler<unknown, unknown, DeleteProductFromRequestBody, unknown> = async (req, res, next) => {
        try {
            const { userId, productId } = req.body;
            if (!userId || !productId) {
                throw createHttpError(400, 'Credentials is missing!')
            }

            const cart = await cartService.deleteFromWish(userId, productId);

            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }


    private validationGetCart({ userId }: GetCartRequestBody): { userIdValidated: mongoose.Types.ObjectId } {
        if (!userId) {
            throw createHttpError(400, 'Credentials is missing!');
        }

        return { userIdValidated: userId };
    }

    private productsPropertiesAddProduct(
        { userId, product }: AddProductRequestBody
    ): { userIdValidated: mongoose.Types.ObjectId, productValidated: Product } {
        if (!userId || !product) {
            throw createHttpError(400, 'Credentials is missing!');
        }

        return {
            userIdValidated: userId,
            productValidated: product,
        }
    }
}


export default new CartsControllers();