import IProduct from "@/interfaces/IProduct";
import axios from "axios";


class ProductService {
    async getAllProducts() {
        try {
            const { data } = await axios.get<IProduct[]>('http://localhost:5000/api/products');
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async getOneProduct(_id: string) {
        try {
            const { data } = await axios.get<IProduct>(`http://localhost:5000/api/products/product/${_id}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async getFilteredProduct(name: string) {
        try {
            const { data } = await axios.get<IProduct[]>(`http://localhost:5000/api/products/${name}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async getFindSeachProduct(name: string) {
        try {
            const { data } = await axios.get<IProduct[]>(`http://localhost:5000/api/products/search/${name}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();