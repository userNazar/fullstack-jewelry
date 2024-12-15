import mongoose from "mongoose";


interface IDofProduct {
    _id: mongoose.Types.ObjectId;
}


export interface Product {
    name: string;
    price: number;
    stock: boolean;
    weight: number;
    country: string;
    series: string;
    ringWidth: string;
    metalColor: string;
    ringDesign: string;
    sex: string;
}

export interface CreateProductRequestBody extends Product { }


export interface FilterByNameRequestParams {
    name?: string;
}

export interface DeleteProductRequestBody extends IDofProduct { }
export interface GetOneProductRequestParams extends IDofProduct { }

export interface FindBySearchParams {
    name?: string;
}