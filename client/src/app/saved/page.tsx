'use client';

import { useAppSelector } from "@/redux/hooks";
import WishCard from "./WishCard";
import LoadingPage from "@/components/tech/LoadingPage";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { redirect } from "next/navigation";

const Page = () => {

    const { cart, loading, user } = useAppSelector(state => state.user);

    if (!user) {
        redirect('/customer')
    }

    if (loading) {
        return <LoadingPage />
    }

    return (
        <div className="container mx-auto mt-20 px-4">
            <Link href="/" className="flex items-center group">
                <IoIosArrowBack className="group-hover:scale-110" />
                <span className="ml-2 group-hover:text-teal-700">Continue Shopping</span>
            </Link>
            <h2 className="text-3xl mt-5">
                Saved Items
            </h2>
            <div className="flex mt-10 justify-center sm:justify-between items-center border-b border-black"></div>
            {(cart?.wishList.length === 0 || !cart) &&
                <p className="text-2xl text-gray-400 text-center mt-10">No items in wish list!</p>
            }
            <div className="flex flex-wrap justify-center sm:justify-start">
                {
                    cart?.wishList.map(product =>
                        <WishCard key={product._id} product={product} />
                    )
                }
            </div>

        </div>
    )
}

export default Page;