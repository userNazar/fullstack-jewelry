'use client';

import { useState } from "react";
import { IUser } from "@/interfaces/user/IUser";
import { useAppDispatch } from "@/redux/hooks";
import { logout as logoutState } from "@/redux/features/user-Slicer";
import authService from "@/services/authService";
import { IoIosArrowForward } from "react-icons/io";
import PersonalInfoPage from "@/components/profile/user/PersonalInfoPage";
import OrdersInfoPage from "@/components/profile/user/OrdersInfoPage";
import AdminPage from "@/components/profile/admin/AdminPage";

enum TypeProfileMenu {
    "PERSONAL",
    "ORDERS",
    "ADMIN",
}

interface ProfileProps {
    user: IUser;
}

const Profile = ({ user: { _id, username, role } }: ProfileProps) => {

    const [profileMenuType, setProfileMenuType] = useState<TypeProfileMenu>(TypeProfileMenu.PERSONAL);

    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(logoutState());
        authService.logout();
    };

    return (
        <div className="container mx-auto px-4 mt-20">
            <div className="flex justify-between">
                <h2 className="text-xl">Welcome, <span className="italic">{username}</span></h2>
                <button
                    className="group flex items-center justify-center text-sm"
                    onClick={logout}
                >
                    <span className="mr-2 group-hover group-hover:text-teal-500">Log out!</span>
                    <IoIosArrowForward className="transition duration-500 group-hover:scale-150 group-hover:text-teal-500" />
                </button>
            </div>
            <h2 className="text-3xl mt-3">Your Account</h2>
            <div className="flex mt-5 justify-center sm:justify-between items-center border-b border-black">
                <div className="flex">
                    <div
                        className={`font-semibold text-sm sm:text-md pb-2 cursor-pointer mr-3 sm:mr-5 transition duration-300 ${profileMenuType === TypeProfileMenu.PERSONAL ? "border-b-2 border-black" : ""}`}
                        onClick={() => setProfileMenuType(TypeProfileMenu.PERSONAL)}
                    >
                        Personal Information
                    </div>
                    <div
                        className={`font-semibold text-sm sm:text-md cursor-pointer pb-2 transition duration-300 mr-3 sm:mr-5 ${profileMenuType === TypeProfileMenu.ORDERS ? "border-b-2 border-black" : ""}`}
                        onClick={() => setProfileMenuType(TypeProfileMenu.ORDERS)}
                    >
                        Orders
                    </div>
                    {role === 'ADMIN' &&
                        <div
                            className={`font-semibold text-sm sm:text-md cursor-pointer pb-2 transition duration-300 ${profileMenuType === TypeProfileMenu.ADMIN ? "border-b-2 border-black" : ""}`}
                            onClick={() => setProfileMenuType(TypeProfileMenu.ADMIN)}
                        >
                            Admin Panel
                        </div>
                    }
                </div>
                <div className="hidden sm:block">
                    +4523523525525
                </div>
            </div>
            <div className="mt-5">
                {profileMenuType === TypeProfileMenu.PERSONAL && <PersonalInfoPage />}
                {profileMenuType === TypeProfileMenu.ORDERS && <OrdersInfoPage />}
                {profileMenuType === TypeProfileMenu.ADMIN && <AdminPage />}
            </div>
        </div>
    )
}

export default Profile