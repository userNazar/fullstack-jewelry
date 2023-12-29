'use client'

import { useAppSelector } from "@/redux/hooks"
import adminService from "@/services/adminService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from "next/navigation";


interface DeleteBtnProps {
    _id: string
}

const DeleteBtn = ({ _id }: DeleteBtnProps) => {

    const { user } = useAppSelector(state => state.user);

    if (user?.role !== 'ADMIN') {
        return <></>
    }

    const deleteHandler = async () => {
        await adminService.deleteProduct(_id);
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
        <>
            <button
                className="mt-5 h-[50px] flex justify-between items-center bg-black px-2 text-white cursor-pointer border border-black hover:bg-red-500 hover:text-white transition duration-500"
                onClick={deleteHandler}
            >
                DeleteBtn
            </button>
            <ToastContainer />
        </>

    )
}

export default DeleteBtn