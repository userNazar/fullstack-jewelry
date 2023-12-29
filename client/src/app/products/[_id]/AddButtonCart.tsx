'use client';

import IProduct from "@/interfaces/IProduct";
import { addToCart } from "@/redux/features/user-Slicer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddButtonProps {
    product: IProduct;
}

const AddButton = ({ product }: AddButtonProps) => {
    
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
            dispatch(addToCart({ userId: user._id, product: product }));
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
        <div>
            <button
                className="mt-5 w-full h-[50px] flex justify-between items-center bg-black px-2 text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"
                onClick={addToCartHandler}
            >
                <span>${product?.price}</span>
                <span>Add to Bag</span>
            </button>
            <ToastContainer />
        </div>

    )
}

export default AddButton