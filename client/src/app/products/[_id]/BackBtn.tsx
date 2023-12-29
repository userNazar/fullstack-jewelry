'use client';

import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const BackBtn = () => {
    const router = useRouter();
    return (
        <IoArrowBack className="cursor-pointer" size={30} onClick={() => router.back()}/>
    )
}

export default BackBtn