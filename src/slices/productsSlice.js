import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHeaders, url } from "./api";
import { toast } from "react-toastify";

const initialState = {
    items: [],
    status: null,
    createStatus: null,
    deleteStatus: null,
    editStatus: null,
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {
        try {
            const res = await axios.get(`${url}/products`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const productsCreate = createAsyncThunk(
    "products/productsCreate",
    async (values) => {
        console.log(values)
        try {
            const response = await axios.post(
                `${url}/products`,
                values,
                setHeaders()
            );

            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }
);

export const productsEdit = createAsyncThunk(
    "products/productsEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/products/${values.product._id}`,
                values,
                setHeaders()
            );

            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }
);

export const productsDelete = createAsyncThunk(
    "products/productsDelete",
    async (id) => {
        try {
            const response = await axios.delete(
                `${url}/products/${id}`,
                setHeaders()
            );

            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }
);

const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state) => {
            state.status = "pending";
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [productsFetch.rejected]: (state) => {
            state.status = "rejected";
        },
        [productsCreate.pending]: (state) => {
            state.createStatus = "pending";
        },
        [productsCreate.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.createStatus = "success";
            toast.success("Product Created!");
        },
        [productsCreate.rejected]: (state) => {
            state.createStatus = "rejected";
        },
        [productsDelete.pending]: (state) => {
            state.deleteStatus = "pending";
        },
        [productsDelete.fulfilled]: (state, action) => {
            const indexItem = state.items.findIndex(
                (item) => item._id === action.payload._id
            );
            state.items.splice(indexItem, 1);
            state.deleteStatus = "success";
            toast("Product Deleted!", {
                hideProgressBar: true,
                autoClose: 1500,
                style: { background: "#e74c3c", color: "white"},
            });
        },
        [productsDelete.rejected]: (state) => {
            state.deleteStatus = "rejected";
        },
        [productsEdit.pending]: (state) => {
            state.editStatus = "pending";
        },
        [productsEdit.fulfilled]: (state, action) => {
            const indexItem = state.items.findIndex(
                (item) => item._id === action.payload._id
            );
            state.items[indexItem] = action.payload;
            state.editStatus = "success";
            toast("Product Edited!", {
                hideProgressBar: true,
                autoClose: 1500,
                style: { background: "#3498db", color: "white"},
            });
        },
        [productsEdit.rejected]: (state) => {
            state.editStatus = "rejected";
        },
    },
});

export default productsSlice.reducer;
