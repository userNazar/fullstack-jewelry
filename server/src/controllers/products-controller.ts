import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { CreateProductRequestBody, DeleteProductRequestBody, FilterByNameRequestParams, GetOneProductRequestParams, Product } from "../interfaces/products-interface";
import productsService from "../services/products-service";

class ProductController {

    getAllProducts: RequestHandler = async (req, res, next) => {
        try {
            const products = await productsService.getAllProducts();

            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    getOneProduct: RequestHandler<GetOneProductRequestParams, unknown, unknown, unknown> = async (req, res, next) => {
        try {
            const _id = req.params._id;

            if (!_id) {
                throw createHttpError(400, 'Invalid or missing data');
            }

            const product = await productsService.getOneProduct(_id);

            res.json(product);
        } catch (error) {
            next(error);
        }
    }


    filterByName: RequestHandler<FilterByNameRequestParams, unknown, unknown, unknown> = async (req, res, next) => {
        try {
            const name = req.params.name;
            if (!name) {
                throw createHttpError(400, 'Missing required parameter: name');
            }

            const products = await productsService.filterByName(name);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }


    // for Admin only!
    createProduct: RequestHandler<unknown, unknown, CreateProductRequestBody, unknown> = async (req, res, next) => {
        try {
            const productData = req.body;
            const picture = req.files?.picture;


            const { name, price, stock, weight, country, series, ringWidth, metalColor, ringDesign, sex }: Product = this.validateProductData(productData);
            const product = await productsService.createProduct(name, price, stock, weight, country, series, ringWidth, metalColor, ringDesign, sex, picture);

            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    deleteProduct: RequestHandler<unknown, unknown, DeleteProductRequestBody, unknown> = async (req, res, next) => {
        try {
            const { _id } = req.body;

            if (!_id) {
                throw createHttpError(404, 'Product not found');
            }

            const deleteProduct = await productsService.deleteProduct(_id);
            res.json(deleteProduct);
        } catch (error) {
            next(error);
        }
    }
    private validateProductData(productData: Product): Product {
        const { name, price, stock, weight, country, series, ringWidth, metalColor, ringDesign, sex } = productData;
        if (!name || !price || !stock || !weight || !country || !series || !ringWidth || !metalColor || !ringDesign || !sex) {
            throw createHttpError(400, 'Invalid or missing data');
        }

        return { name, price, stock, weight, country, series, ringWidth, metalColor, ringDesign, sex };
    }
}

export default new ProductController();