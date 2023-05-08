import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const initialState = {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: "signup",
    showForm: false,
}

export const createUser = createAsyncThunk('user/createUser', async (payload) => {
    try {
        const { data }  = await axios.post(`${BASE_URL}/users`, payload);
        return data;
    } catch (error) {
        console.log(error)
    }
})

export const loginUser = createAsyncThunk('user/loginUser', async (payload) => {
    try {
        const login = await axios.post(`${BASE_URL}/auth/login`, payload);
        const currentLoginUser = await axios.get(`${BASE_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${login.data.access_token}`
            },
        });
        return currentLoginUser.data;
    } catch (error) {
        console.log(error);
    }
})

export const updateUser = createAsyncThunk('user/updateUser', async (payload) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
        return data;
    } catch (error) {
        console.log(error);
    }
}) 

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addItemToCart: (state, { payload }) => {
            let newCart = [...state.cart];
            const found = state.cart.find(({ id }) => id === payload.id);
            if(found) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id ? {...item, quantity: payload.quantity || item.quantity + 1}
                    : item;
                });
            } else {
                newCart.push({ ...payload, quantity: 1 });
            }

            state.cart = newCart;
        },
        removeItemFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(({ id }) => id != payload);  
        },
        toggleForm: (state, { payload }) => {
            state.showForm = payload;
        },
        toggleFormType: (state, { payload }) => {
            state.formType = payload;
        }
    },
    extraReducers: {
        [createUser.fulfilled]: (state, { payload }) => {
            state.currentUser = payload; 
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
    }

})

export const { addItemToCart, toggleForm, toggleFormType, removeItemFromCart } = userSlice.actions;

export default userSlice.reducer;