import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHeaders, url } from "./api";
import { toast } from "react-toastify";

const initialState = {
    list: [],
    status: null,
};

export const ordersFetch = createAsyncThunk(
    "orders/ordersFetch",
    async () => {
        try {
            const res = await axios.get(`${url}/orders`, setHeaders());
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

// export const ordersCreate = createAsyncThunk(
//     "orders/ordersCreate",
//     async (values) => {
//         try {
//             const response = await axios.post(
//                 `${url}/orders`,
//                 values,
//                 setHeaders()
//             );

//             return response.data;
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data);
//         }
//     }
// );

export const ordersEdit = createAsyncThunk(
    "orders/ordersEdit",
    async (values, {getState}) => {
        const state = getState();

        let currentOrder = state.orders.list.filter((order) => order._id === values.id)

        const newOrder = {
            ...currentOrder[0],
            delivery_status: values.delivery_status
        }
        try {
            const response = await axios.put(
                `${url}/orders/${values.id}`,
                newOrder,
                setHeaders()
            );

            return response.data;
        } catch (error) {
            console.log(error);
            // toast.error(error.response?.data);
        }
    }
);

// export const ordersDelete = createAsyncThunk(
//     "orders/ordersDelete",
//     async (id) => {
//         try {
//             const response = await axios.delete(
//                 `${url}/orders/${id}`,
//                 setHeaders()
//             );

//             return response.data;
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data);
//         }
//     }
// );

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: {
        [ordersFetch.pending]: (state) => {
            state.status = "pending";
        },
        [ordersFetch.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.status = "success";
        },
        [ordersFetch.rejected]: (state) => {
            state.status = "rejected";
        },
        // [ordersCreate.pending]: (state) => {
        //     state.createStatus = "pending";
        // },
        // [ordersCreate.fulfilled]: (state, action) => {
        //     state.items.push(action.payload);
        //     state.createStatus = "success";
        //     toast.success("order Created!");
        // },
        // [ordersCreate.rejected]: (state) => {
        //     state.createStatus = "rejected";
        // },
        // [ordersDelete.pending]: (state) => {
        //     state.deleteStatus = "pending";
        // },
        // [ordersDelete.fulfilled]: (state, action) => {
        //     const indexItem = state.items.findIndex(
        //         (item) => item._id === action.payload._id
        //     );
        //     state.items.splice(indexItem, 1);
        //     state.deleteStatus = "success";
        //     toast("order Deleted!", {
        //         hideProgressBar: true,
        //         autoClose: 1500,
        //         style: { background: "#e74c3c", color: "white"},
        //     });
        // },
        // [ordersDelete.rejected]: (state) => {
        //     state.deleteStatus = "rejected";
        // },
        [ordersEdit.pending]: (state) => {
            state.status = "pending";
        },
        [ordersEdit.fulfilled]: (state, action) => {
            const indexItem = state.list.findIndex(
                (item) => item._id === action.payload._id
            );
            state.list[indexItem] = action.payload;
            state.status = "success";
            toast("Order Edited!", {
                hideProgressBar: true,
                autoClose: 1500,
                style: { background: "#3498db", color: "white"},
            });
        },
        [ordersEdit.rejected]: (state) => {
            state.status = "rejected";
        },
    },
});

export default ordersSlice.reducer;
