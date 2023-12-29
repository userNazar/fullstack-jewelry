import $api from "@/http";
import IProduct from "@/interfaces/IProduct";
import ICart from "@/interfaces/user/ICart";


class CartService {
    async addToCart(userId: string, product: IProduct) {
        try {
            const { data } = await $api.post<ICart>('http://localhost:5000/api/cart/add', { userId: userId, product: product }, { withCredentials: true });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async addToWish(userId: string, product: IProduct) {
        try {
            const { data } = await $api.post<ICart>('http://localhost:5000/api/cart/addwish', { userId: userId, product: product }, { withCredentials: true });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async removeFromCart(userId: string, productId: string) {
        try {
            const { data } = await $api.post<ICart>('http://localhost:5000/api/cart/removecart', { userId: userId, productId: productId }, { withCredentials: true });
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async removeFromWish(userId: string, productId: string) {
        try {
            const { data } = await $api.post<ICart>('http://localhost:5000/api/cart/removewish', { userId: userId, productId: productId }, { withCredentials: true });
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CartService();