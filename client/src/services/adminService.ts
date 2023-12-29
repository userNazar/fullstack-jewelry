import $api from "@/http";
import { IUser } from "@/interfaces/user/IUser";


class AdminService {
    async getAllUsers() {
        const { data } = await $api.get<IUser[]>('http://localhost:5000/api/users/users');
        return data;
    }

    async createProduct(formData: FormData) {
        try {
            await $api.post('http://localhost:5000/api/products/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

        } catch (error) {
            console.error(error);
        }
    }

    async deleteProduct(_id: string) {
        try {
            await $api.post('http://localhost:5000/api/products/delete', { _id: _id }, { withCredentials: true });

        } catch (error) {
            console.error(error);
        }
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new AdminService();