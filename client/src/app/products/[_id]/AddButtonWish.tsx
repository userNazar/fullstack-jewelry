'use client';

import IProduct from "@/interfaces/IProduct";
import { addToWish } from "@/redux/features/user-Slicer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FcLike } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddButtonProps {
    product: IProduct;
}

const AddButtonWish = ({ product }: AddButtonProps) => {

    const { user } = useAppSelector(state => state.user);
    const { cart } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const addToCartHandler = () => {
     
        const existingProduct = cart?.wishList.find(prodCart => prodCart._id === product._id);

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
            dispatch(addToWish({ userId: user._id, product: product }));
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
    return (
        <div className="mt-2 cursor-pointer w-[20px] h-[20px]">
            <button onClick={addToCartHandler}>
                <FcLike size={20} />
            </button>

            <ToastContainer />
        </div>
    )
}

export default AddButtonWish