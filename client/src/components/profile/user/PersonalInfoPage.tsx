'use client'

import { changeUserData } from "@/redux/features/user-Slicer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import authService from "@/services/authService";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

export enum Status {
    Married = 'Married',
    Relationship = 'Relationship',
    Single = 'Single',
}

const PersonalInfoPage = () => {

    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const [usernameValue, setUsernameValue] = useState<string>(user?.username || '');
    const [selectedGender, setSelectedGender] = useState<Gender>(user?.sex as Gender || '');
    const [statusVal, setStatusVal] = useState<Status>(user?.status as Status || '');

    const handleGenderChange = (gender: Gender) => {
        setSelectedGender(gender);
    };

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!usernameValue || !statusVal || !selectedGender) {
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
            return;
        }
        if (user?._id) {
            authService.renew(user._id, usernameValue, selectedGender, statusVal);
            dispatch(changeUserData({ username: usernameValue, sex: selectedGender, status: statusVal }));
        }
        toast.success('Saved!', {
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
        <form
            className="flex justify-center sm:justify-between mt-10"
            onSubmit={(e: FormEvent<HTMLFormElement>) => formHandler(e)}
        >
            <div className="min-w-[300px] sm:w-[500px]">
                <div>
                    <label>
                        <span className="text-gray-500 text-sm">Name</span>
                        <input
                            className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                            type="text"
                            value={usernameValue}
                            onChange={e => setUsernameValue(e.target.value)}
                            placeholder="Name"
                        />
                    </label>
                </div>
                <h2 className="mt-10 text-gray-500 text-sm">Gender (optional)</h2>
                <div className="mt-2">
                    <label>
                        <input
                            className="mr-2"
                            type="radio"
                            name="gender"
                            value="male"
                            checked={selectedGender === Gender.Male}
                            onChange={() => handleGenderChange(Gender.Male)}
                        />
                        Male
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            className="mr-2"
                            type="radio"
                            name="gender"
                            value="female"
                            checked={selectedGender === Gender.Female}
                            onChange={() => handleGenderChange(Gender.Female)}
                        />
                        Female
                    </label>
                </div>

                <div>
                    <label>
                        <input
                            className="mr-2"
                            type="radio"
                            name="gender"
                            value="other"
                            checked={selectedGender === Gender.Other}
                            onChange={() => handleGenderChange(Gender.Other)}
                        />
                        Other
                    </label>
                </div>
                <div className="mt-5">
                    <label>
                        <span className="text-gray-500 text-sm">Status (optional)</span>
                        <select
                            className="block w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:border-black transition duration-500"
                            onChange={(e) => setStatusVal(e.target.value as Status)}
                            value={statusVal}
                        >
                            <option value=""></option>
                            <option value="Married">Married</option>
                            <option value="Relationship">In a relationship</option>
                            <option value="Single">Single</option>
                        </select>
                    </label>
                </div>
                <button
                    className="mt-10 w-full h-[50px] flex justify-center items-center bg-black text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"
                >
                    Save
                </button>
            </div>

            <div className="hidden sm:block ml-10">
                <Image
                    src="/static/blue-box.jpg"
                    width={600}
                    height={600}
                    alt="Picture of the author"
                />
            </div>
            <ToastContainer />
        </form >
    )
}

export default PersonalInfoPage