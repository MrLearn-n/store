import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/constants";


const initialState = {
    list: [],
    currentList: [],
    isLoading: false,
}

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/categories`);
        return data;
    } catch (error) {
        console.log(error);
    }
})

export const getCategoriesById = createAsyncThunk('categories/getCategoriesById', async (param) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/categories/${param}/products`);
        return data;
    } catch (error) {
        console.log(error);
    }
})

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.list = [];
            state.isLoading = true;
        },
        [getCategories.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.isLoading = false;
        },
        [getCategories.rejected]: (state) => {
            state.isLoading = false;
        },
        [getCategoriesById.fulfilled]: (state, { payload }) => {
            state.currentList = payload;
            state.isLoading = false;
        },
    },
})

export default categoriesSlice.reducer;