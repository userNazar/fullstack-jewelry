'use client';

import { login, resetError } from "@/redux/features/user-Slicer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormLogin = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, error } = useAppSelector(state => state.user);

    if (user) {
        router.replace('/customer');
    }


    const handelSumbit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(login({ email, password } as LogInUserRequestBody));
    }

    if (error) {
        toast.error('Missing data!', {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        dispatch(resetError());
    }

    return (
        <form
            className="max-w-[510px] mx-auto mt-10"
            onSubmit={(event: FormEvent<HTMLFormElement>) => handelSumbit(event)}
        >
            <div>
                <input
                    className="mt-5 block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
            </div>

            <div>
                <input
                    className="mt-5 block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
            </div>
            <button
                className="mt-10 w-full h-[50px] flex justify-center items-center bg-black text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"
            >
                Sign up
            </button>
            <ToastContainer />
        </form>
    )
}

export default FormLogin