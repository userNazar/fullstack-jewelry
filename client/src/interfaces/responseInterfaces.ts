import ICart from "./user/ICart";
import { IUser } from "./user/IUser";

export default interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
    cart: ICart;
}