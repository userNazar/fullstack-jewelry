import { createSlice } from "@reduxjs/toolkit";


type SearchingFound = 'Search' | 'Found';

interface initialStateProps {
    name: string;
    type: SearchingFound;
}

const initialState: initialStateProps = {
    name: '',
    type: 'Search',
}

const searchSlicer = createSlice({
    name: "slicer",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        }
    }
});

export const { setName, setType } = searchSlicer.actions;

export default searchSlicer.reducer;