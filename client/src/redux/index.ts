'use client';

import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "./features/user-Slicer";
import adminSlicer from "./features/admin-Slicer";
import searchSlicer from "./features/search-Slicer";

export const store = configureStore({
    reducer: {
        user: userSlicer,
        admin: adminSlicer,
        search: searchSlicer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;