import { IUser } from "@/interfaces/user/IUser";
import adminService from "@/services/adminService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
    'admin/getAll',
    async () => {
        const users = await adminService.getAllUsers();
        return users;
    }
)

interface initialStateProps {
    loading: boolean;
    error: string | null;
    users: IUser[];
}

const initialState: initialStateProps = {
    loading: false,
    error: null,
    users: [],
}

const adminSlicer = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder

            .addCase(getAllUsers.pending, state => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : "Failed getting users";
            })
    }
});

export default adminSlicer.reducer;