"use client";

import IProduct from "@/interfaces/IProduct";
import { addToCardLocal, addToCart, removeFromWishLocal } from "@/redux/features/user-Slicer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import cartSevice from "@/services/cartSevice";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface WishCardProps {
    product: IProduct;
}

const WishCard = ({ product }: WishCardProps) => {
    const { user } = useAppSelector(state => state.user);
    const { cart } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    
    const addToCartHandler = () => {
        const existingProduct = cart?.cartList.find(prodCart => prodCart._id === product._id);

        if (!user) {
            toast.error('Log in please!', {
                position: "top-center",
                autoClose: 300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (!existingProduct) {
            dispatch(addToCardLocal(product));
            cartSevice.addToCart(user._id, product);
        }
        toast.success('Product added!', {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const removeFromList = () => {
        if (!user) {
            toast.error('Log in please!', {
                position: "top-center",
                autoClose: 300,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        dispatch(removeFromWishLocal(product._id));
        cartSevice.removeFromWish(user._id, product._id);
        
        toast.success('Product removed!', {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <div className="p-4">
            <Link href={'/products/' + product._id}>
                <Image className="hover:scale-90 transition duration-300" src={'http://localhost:5000/' + product.picture} width={200} height={200} alt={product.name} />
            </Link>
            <button
                className="mt-5 w-full h-[50px] flex justify-between items-center bg-white px-2 text-black cursor-pointer border border-black hover:bg-black hover:text-white transition duration-500"
                onClick={addToCartHandler}
            >
                <span>${product.price}</span>
                <span>Add to Bag!</span>
            </button>
            <button
                className="mt-5 border-b border-gray-400 hover:border-teal-200 transition duration-500"
                onClick={removeFromList}
            >
                Remove
            </button>
            <ToastContainer />
        </div>
    )
}

export default WishCard