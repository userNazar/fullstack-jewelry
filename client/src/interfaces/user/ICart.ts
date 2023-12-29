import IProduct from "../IProduct";



export default interface ICart {
    cartList: IProduct[];
    wishList: IProduct[];
}