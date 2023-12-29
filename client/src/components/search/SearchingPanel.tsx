'use client';

import { setName, setType } from "@/redux/features/search-Slicer";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const SearchingPanel = () => {

    const [searchText, setSearchText] = useState<string>('');
    const dispatch = useAppDispatch();

    const router = useRouter();

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (searchText.trim()) {
            dispatch(setName(searchText));
            dispatch(setType('Found'));
            router.push('/search/' + searchText);
        }

    };

    useEffect(() => {
        dispatch(setType('Search'))
    }, []);

    return (
        <form onSubmit={onSubmit} className="container mx-auto mt-10 px-10">
            <div>
                <input
                    className="mt-5 block w-full px-4 py-2 border-b-2 border-gray-400 focus:outline-none focus:border-black transition duration-500"
                    type="text"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Product..."
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    className="mt-5 min-w-[300px] max-w-[400px] h-[50px] flex justify-center items-center bg-black text-white cursor-pointer border border-black hover:bg-teal-200 hover:text-black transition duration-500"
                >
                    Find
                </button>
            </div>

        </form>
    )
}

export default SearchingPanel