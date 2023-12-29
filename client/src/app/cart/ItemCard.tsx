'use client';

import IProduct from "@/interfaces/IProduct";
import { removeFromCartLocal } from "@/redux/features/user-Slicer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cartSevice from "@/services/cartSevice";


interface ItemCardProps {
    product: IProduct;
}

const ItemCard = ({ product }: ItemCardProps) => {
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const deleteHandler = () => {
        if (!user) {
            return;
        }
        dispatch(removeFromCartLocal(product._id));
        cartSevice.removeFromCart(user._id, product._id);
        
        toast.success('Deleted!', {
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
        <div className="flex my-2 items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-300">
            <div className="sm:w-[100px] sm:h-[100px] w-[50px] h-[50px]">
                <Image src={'http://localhost:5000/' + product.picture} width={100} height={100} alt={product.name} />
            </div>
            <div className="ml-2 flex">
                <div className="font-bold">{product.name}</div>
                <div className="ml-2">${product.price}</div>
            </div>
            <div className="cursor-pointer ml-auto mr-2" onClick={deleteHandler}>
                <IoMdClose size={20} />
            </div>
            <ToastContainer />
        </div>
    )
}

export default ItemCard