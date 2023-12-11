import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    email: "",
    _id: "",
    createdAt: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    editProfileStatus: "",
    editPasswordStatus: "",
    editPasswordError: "",
    userLoaded: false,
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${url}/register`, {
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            });

            localStorage.setItem("token", token.data);

            return token.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${url}/login`, {
                email: values.email,
                password: values.password,
            });

            localStorage.setItem("token", token.data);
            return token.data;
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    }
);
export const editUserPassword = createAsyncThunk(
    "auth/editUserPassword",
    async (values, { rejectWithValue }) => {
        try {
            const token = await axios.put(
                `${url}/users/password/${values.id}`,
                values,
                setHeaders()
            );

            localStorage.setItem("token", token.data);
            return token.data;
        } catch (error) {
            console.log(error.response);
            return rejectWithValue(error.response.data);
        }
    }
);

export const editUserProfile = createAsyncThunk(
    "users/editUserProfile",
    async (values) => {
        console.log(values);
        try {
            const response = await axios.put(
                `${url}/users/profile/${values.id}`,
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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser(state) {
            const token = state.token;
            if (token) {
                const user = jwtDecode(token);
                console.log(user)
                const createdAtTimestamp = user.iat * 1000;
                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    image: user.image,
                    phone: user.phone,
                    gender: user.gender,
                    dob: user.dob,
                    createdAt: createdAtTimestamp,
                    userLoaded: true,
                };
            }
        },
        logoutUser(state) {
            localStorage.removeItem("token");
            return {
                ...state,
                token: "",
                name: "",
                email: "",
                _id: "",
                isAdmin: "",
                image: "",
                phone: "",
                gender: "",
                dob: "",
                createdAt: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            return { ...state, registerStatus: "pending" };
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    image: user.image,
                    phone: user.phone,
                    gender: user.gender,
                    dob: user.dob,
                    registerStatus: "success",
                };
            } else return state;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload,
            };
        });
        builder.addCase(loginUser.pending, (state) => {
            return { ...state, loginStatus: "pending" };
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                localStorage.setItem("token", action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    image: user.image,
                    phone: user.phone,
                    gender: user.gender,
                    dob: user.dob,
                    loginStatus: "success",
                };
            } else return state;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload,
            };
        });
        builder.addCase(editUserProfile.pending, (state) => {
            return {
                ...state,
                editProfileStatus: "pending",
            };
        });
        builder.addCase(editUserProfile.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                localStorage.setItem("token", action.payload);

                toast.success("Update Information Successfully!", {
                    hideProgressBar: true,
                    position: "top-center",
                    autoClose: 1500,
                });
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    image: user.image,
                    phone: user.phone,
                    gender: user.gender,
                    dob: user.dob,
                    editProfileStatus: "success",
                };
            } else return state;
        });
        builder.addCase(editUserProfile.rejected, (state, action) => {
            return {
                ...state,
                editProfileStatus: "rejected",
                editProfileError: action.payload,
            };
        });
        builder.addCase(editUserPassword.pending, (state) => {
            return {
                ...state,
                editPasswordStatus: "pending",
            };
        });
        builder.addCase(editUserPassword.fulfilled, (state, action) => {
            if (action.payload) {
                localStorage.setItem("token", action.payload);

                toast.success("New Password Setted!", {
                    hideProgressBar: true,
                    position: "top-center",
                    autoClose: 1500,
                });
                return {
                    ...state,
                    token: action.payload,
                    editPasswordStatus: "success",
                };
            } else return state;
        });
        builder.addCase(editUserPassword.rejected, (state, action) => {
            return {
                ...state,
                editPasswordStatus: "rejected",
                editPasswordError: action.payload,
            };
        });
    },
});

export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
