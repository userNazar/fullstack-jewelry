'use client';

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Profile from "./Profile";
import LoadingPage from "@/components/tech/LoadingPage";

const Page = () => {
    const { user, loading } = useAppSelector(state => state.user);
    const router = useRouter();

    if (user) {
        return <Profile user={user} />
    }

    if (loading) {
        return <LoadingPage />
    }

    return (
        <div className="container mx-auto flex flex-col items-center justify-center flex-wrap mt-20">
            <div className="flex-grow p-4 max-w-[310px]">
                <h2 className="text-3xl">Sign up</h2>
                <div className="text-lg mt-5">Please sign in to your Tiffany Account.</div>
                <div
                    className="mt-5 max-w-[310px] h-[50px] flex justify-center items-center bg-black text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"
                    onClick={() => router.push('/customer/login')}
                >
                    Sing up
                </div>
            </div>

            <div className="flex-grow p-4 max-w-[310px] mt-10">
                <h2 className="text-3xl">Create an Account</h2>
                <div className="text-lg mt-5">Save time during checkout, view your shopping bag and saved items from any device and access your order history.</div>
                <div
                    className="mt-5 max-w-[310px] h-[50px] flex justify-center items-center bg-black text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"
                    onClick={() => router.push('/customer/registration')}
                >
                    Register
                </div>
            </div>
        </div>
    )
}

export default Page;