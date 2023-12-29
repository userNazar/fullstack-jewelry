import { Gender, Status } from "@/components/profile/user/PersonalInfoPage";
import $api from "@/http";
import AuthResponse from "@/interfaces/responseInterfaces";

class AuthService {

    async signup(requestBody: CreateUserRequestBody) {
        const { data } = await $api.post<AuthResponse>('http://localhost:5000/api/users/signup', requestBody, { withCredentials: true });
        localStorage.setItem('accessToken', data.accessToken);
        return data;
    }

    async login(requestBody: LogInUserRequestBody) {
        const { data } = await $api.post<AuthResponse>('http://localhost:5000/api/users/login', requestBody, { withCredentials: true });
        localStorage.setItem('accessToken', data.accessToken);
        return data;
    }

    async logout() {
        const { data } = await $api.post('http://localhost:5000/api/users/logout', { withCredentials: true });
        localStorage.removeItem('accessToken');
        console.log(data);
    }

    async refresh() {
        const { data } = await $api.get<AuthResponse>('http://localhost:5000/api/users/refresh', { withCredentials: true });
        localStorage.setItem('accessToken', data.accessToken);
        return data;
    }

    async renew(_id: string, username: string, sex?: Gender, status?: Status) {
        const { data } = await $api.patch('http://localhost:5000/api/users/renew', { _id, username, sex, status }, { withCredentials: true });
        return data;
    }

}
// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();