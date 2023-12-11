import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setHeaders, url } from "./api";
import { toast } from "react-toastify";

const initialState = {
    list: [],
    status: null,
    createStatus: null,
    deleteStatus: null,
    editStatus: null,
};

export const usersFetch = createAsyncThunk(
    "users/usersFetch",
    async () => {
        try {
            const res = await axios.get(`${url}/users`, setHeaders());
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const usersCreate = createAsyncThunk(
    "users/usersCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/users`,
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

export const usersEdit = createAsyncThunk(
    "users/usersEdit",
    async (values, { getState }) => {
        const state = getState();

        let currentUser = state.users.list.filter((user) => user._id === values.id)

        const newUser = {
            ...currentUser[0],
            isAdmin: values.isAdmin
        }
        try {
            const response = await axios.put(
                `${url}/users/${values.id}`,
                newUser,
                setHeaders()
            );

            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }
);

export const usersDelete = createAsyncThunk(
    "users/usersDelete",
    async (id) => {
        try {
            const response = await axios.delete(
                `${url}/users/${id}`,
                setHeaders()
            );

            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [usersFetch.pending]: (state) => {
            state.status = "pending";
        },
        [usersFetch.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.status = "success";
        },
        [usersFetch.rejected]: (state) => {
            state.status = "rejected";
        },
        [usersCreate.pending]: (state) => {
            state.createStatus = "pending";
        },
        [usersCreate.fulfilled]: (state, action) => {
            state.list.push(action.payload);
            state.createStatus = "success";
            toast.success("user Created!");
        },
        [usersCreate.rejected]: (state) => {
            state.createStatus = "rejected";
        },
        [usersDelete.pending]: (state) => {
            state.deleteStatus = "pending";
        },
        [usersDelete.fulfilled]: (state, action) => {
            const indexItem = state.list.findIndex(
                (item) => item._id === action.payload._id
            );
            state.list.splice(indexItem, 1);
            state.deleteStatus = "success";
            toast("User Deleted!", {
                hideProgressBar: true,
                autoClose: 1500,
                style: { background: "#e74c3c", color: "white" },
            });
        },
        [usersDelete.rejected]: (state) => {
            state.deleteStatus = "rejected";
        },
        [usersEdit.pending]: (state) => {
            state.editStatus = "pending";
        },
        [usersEdit.fulfilled]: (state, action) => {
            const indexItem = state.list.findIndex(
                (item) => item._id === action.payload._id
            );
            state.list[indexItem] = action.payload;
            state.editStatus = "success";
            toast("user Edited!", {
                hideProgressBar: true,
                autoClose: 1500,
                style: { background: "#3498db", color: "white" },
            });
        },
        [usersEdit.rejected]: (state) => {
            state.editStatus = "rejected";
        },
    },
});

export default usersSlice.reducer;
