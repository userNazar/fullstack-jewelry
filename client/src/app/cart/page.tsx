'use client';

import LoadingPage from "@/components/tech/LoadingPage";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ItemCard from "./ItemCard";

export default function Page() {

    const { user, cart, loading } = useAppSelector(state => state.user);


    if (!user) {
        redirect('/customer')
    }
    if (loading) {
        return <LoadingPage />
    }

    const buttonHandler = () => {
        if (!cart?.cartList) {
            toast.error('List empty!', {
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

        toast.success('Success!', {
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
        <div className="container mx-auto px-4 mt-20">
            <Link href="/" className="flex items-center group">
                <IoIosArrowBack className="group-hover:scale-110" />
                <span className="ml-2 group-hover:text-teal-700">Continue Shopping</span>
            </Link>
            <div className="flex flex-wrap justify-center md:justify-between ">
                <div className="min-w-[300px] lg:min-w-[500px] mt-2">
                    <h2 className="text-3xl mt-5">Shopping Bag</h2>
                    <p className="font-semibold mt-5">Your cart items:</p>
                    <div className="flex mt-5 justify-center sm:justify-between items-center border-b border-black"></div>
                    <div className="min-h-[160px] flex flex-col justify-center">
                        {(cart?.cartList.length === 0 || !cart) &&
                            <p className="flex justify-center items-center text-2xl text-gray-400">No items in cart!</p>
                        }
                        {
                            cart?.cartList.map(product =>
                                <ItemCard key={product._id} product={product} />
                            )
                        }
                    </div>
                    <div className="flex mt-5 justify-center sm:justify-between items-center border-b border-black"></div>
                </div>
                <div className="lg:w-[400px] h-[400px] bg-gray-100 p-5 mt-2 flex flex-col">
                    <div className="font-semibold">Order Summary </div>
                    <div className="flex justify-between mt-10">
                        <span>Subtotal</span>
                        <span>
                            ${cart?.cartList.reduce((accumulator, product) => accumulator + +product.price, 0).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between mt-10">
                        <span>Express Delivery with Signature $0</span>
                        <span>
                            0
                        </span>
                    </div>
                    <div className="flex mt-5 justify-center sm:justify-between items-center border-b border-black"></div>
                    <div>
                        <div className="flex justify-between mt-10">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-lg font-bold">
                                ${cart?.cartList.reduce((accumulator, product) => accumulator + +product.price, 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <div
                        className="mt-auto mx-auto w-[310px] h-[50px] flex justify-center items-center bg-black text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"
                        onClick={buttonHandler}
                    >
                        Check out
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

