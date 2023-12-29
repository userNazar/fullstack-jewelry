'use client';

import { getAllUsers } from "@/redux/features/admin-Slicer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const GetUsersPage = () => {

    const { users } = useAppSelector(state => state.admin);
    const dispatch = useAppDispatch();

    const getAll = async () => {
        dispatch(getAllUsers());
    }

    return (
        <div className="w-[300px] mt-10 mx-2" onClick={getAll}>
            <h3 className="text-xl font-semibold">
                Users:
            </h3>
            <div className="">
                {users.length === 0 &&
                    <div className="text-gray-500 mt-5">No users!</div>
                }
                {
                    users.map(user =>
                        <div key={user._id} className="border border-gray-400 rounded-sm my-5 px-5 py-2">
                            <h4 className="text-xl">User:<span className="ml-2 font-semibold">{user.username}</span></h4>
                            <p className="mt-3">Email:<span className="ml-2 font-semibold">{user.email}</span></p>
                            <p className="mt-1">Role:<span className="ml-2 font-semibold">{user.role}</span></p>
                            <p className="mt-1">Sex:<span className="ml-2 font-semibold">{user.sex}</span></p>
                            <p className="mt-1">Activated:<span className="ml-2 font-semibold">{user.isActivated ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>}</span></p>
                        </div>
                    )
                }
            </div>
            <button
                className="mt-10 w-full h-[50px] flex justify-center items-center bg-black text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"
                onClick={getAll}
            >
                Get all
            </button>
        </div>
    )
}

export default GetUsersPage