'use client'

import { setName, setType } from "@/redux/features/search-Slicer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useParams } from "next/navigation";
import { useEffect } from "react";

const SearchingTitle = () => {

    const { name, type } = useAppSelector(state => state.search);
    const dispatch = useAppDispatch();

    const params = useParams();

    useEffect(() => {
        if (params.name) {
            dispatch(setName(params.name));
            dispatch(setType('Found'));
        }
    }, [])

    return (
        <div className="container mx-auto px-10 mt-20">
            {type === 'Search' &&
                <h3 className="text-xl">Find element by name</h3>
            }
            {type === 'Found' &&
                <h3 className="text-xl">Result: <span className="font-semibold">{name}</span></h3>
            }
        </div>
    )
}

export default SearchingTitle