'use client';

import { useEffect, ReactNode } from "react";
import { refresh } from "../features/user-Slicer";
import { useAppDispatch } from "../hooks";

const Refresh = ({ children }: { children: ReactNode }) => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(refresh());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>{children}</>
    )
}

export default Refresh;