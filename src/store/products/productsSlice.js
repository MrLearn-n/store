import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const initialState = {
    list: [],
    currentProductId: [],
    filtered: [],
    related: [],
    searchResult: [],
    isSearchLoading: false,
    isLoading: false,
}

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const { data } = await axios.get(`${BASE_URL}/products`);
    return data;
}) 

export const getProductsByTitle = createAsyncThunk('products/getProductById', async (param) => {
   try {
        const { data } = await axios.get(`${BASE_URL}/products/?title=${param}`);
        return data;
   } catch (error) {
        console.log(error);
   }
})


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterByPrice: (state, { payload }) => {
            state.filtered = state.list.filter(({price}) => price < payload);
        },
        filterProductById: (state, { payload }) => {
            state.currentProductId = state.list.filter(({id}) => id == payload)
        },
        getRelatedProducts: (state, { payload }) => {
            state.related = state.list.filter(({ category: { id } }) => id === payload);; 
        }
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.list = [];
            state.isLoading = true;
        },
        [getProducts.fulfilled]: (state, { payload }) => {
            state.list = payload;
            state.isLoading = false;
        },
        [getProducts.rejected]: (state) => {
            state.isLoading = false;
        },
        [getProductsByTitle.pending]: (state) => {
            state.searchResult = [];
            state.isSearchLoading = true;
        },
        [getProductsByTitle.fulfilled]: (state, { payload }) => {
            state.searchResult = payload;
            state.isSearchLoading = false;
        },
        [getProductsByTitle.rejected]: (state) => {
            state.isSearchLoading = false;
        },
    }
})

export const { filterByPrice, filterProductById, getRelatedProducts } = productSlice.actions;
export default productSlice.reducer;
