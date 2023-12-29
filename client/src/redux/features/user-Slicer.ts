'use client';

import IProduct from "@/interfaces/IProduct";
import ICart from "@/interfaces/user/ICart";
import { IUser } from "@/interfaces/user/IUser";
import authService from "@/services/authService";
import cartSevice from "@/services/cartSevice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const signup = createAsyncThunk(
    "user/signup",
    async (requestBody: CreateUserRequestBody, { rejectWithValue }) => {
        try {
            const data = await authService.signup(requestBody);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError;
            const responseError = (axiosError.response?.data as any)?.error;
            const errorMessage = responseError ? responseError.toString() : "Failed to REGISTER user."
            return rejectWithValue(errorMessage);
        }
    }
)

export const login = createAsyncThunk(
    "user/login",
    async (requestBody: LogInUserRequestBody, { rejectWithValue }) => {
        try {
            const data = await authService.login(requestBody);
            return data;
        } catch (error) {
            const axiosError = error as AxiosError;
            const responseError = (axiosError.response?.data as any)?.error;
            const errorMessage = responseError ? responseError.toString() : "Failed to LOGIN user.";
            return rejectWithValue(errorMessage);
        }
    }
);


export const refresh = createAsyncThunk(
    "user/refresh",
    async () => {
        try {
            const data = await authService.refresh();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const addToCart = createAsyncThunk(
    "user/addToCart",
    async ({ userId, product }: { userId: string, product: IProduct }) => {
        try {
            const data = await cartSevice.addToCart(userId, product);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const addToWish = createAsyncThunk(
    "user/addToWish",
    async ({ userId, product }: { userId: string, product: IProduct }) => {
        try {
            const data = await cartSevice.addToWish(userId, product);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

interface initialStateProps {
    user: IUser | null;
    loading: boolean;
    error: string | null;
    cart: ICart | null;
}

const initialState: initialStateProps = {
    user: null,
    cart: null,
    loading: false,
    error: null,
}

const userSlicer = createSlice({
    name: 'userSlicer',
    initialState,
    reducers: {
        resetError: state => {
            state.error = null;
        },
        logout: state => {
            state.user = null;
            state.error = null;
            state.cart = null;
        },
        changeUserData: (state, action) => {
            if (state.user) {
                state.user.username = action.payload.username;
                state.user.sex = action.payload.sex;
                state.user.status = action.payload.status;
            }
        },
        addToCardLocal: (state, action) => {
            if (state.cart) {
                state.cart.cartList = state.cart.cartList = [...state.cart.cartList, action.payload];
            }
        },
        removeFromCartLocal: (state, action) => {
            if (state.cart) {
                state.cart.cartList = state.cart?.cartList.filter(product => product._id !== action.payload);
            }
        },
        removeFromWishLocal: (state, action) => {
            if (state.cart) {
                state.cart.wishList = state.cart?.wishList.filter(product => product._id !== action.payload);
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(signup.pending, state => {
                state.loading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.cart = action.payload.cart;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : "Failed to register user.";
            })




            .addCase(login.pending, state => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.cart = action.payload.cart;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : "Failed to register user.";
            })


            .addCase(refresh.pending, state => {
                state.loading = true;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.user && action.payload.cart) {
                    state.user = action.payload.user;
                    state.cart = action.payload.cart;
                }
            })
            .addCase(refresh.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : "Failed to register user.";
            })


            .addCase(addToCart.pending, state => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload || null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : "Some error";
            })


            .addCase(addToWish.pending, state => {
                state.loading = true;
            })
            .addCase(addToWish.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload || null;
            })
            .addCase(addToWish.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : "Some error";
            })
    }
});

export const { resetError, logout, changeUserData, removeFromCartLocal, removeFromWishLocal, addToCardLocal } = userSlicer.actions;
export default userSlicer.reducer;