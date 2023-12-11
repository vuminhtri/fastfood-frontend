import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productsReducer, { productsFetch } from "./slices/productsSlice.js";
// import { productsApi } from "./slices/productsAPI.js";
import cartReducer, { getTotals } from "./slices/cartSlice.js";
import authReducer, { loadUser } from "./slices/authSlice.js";
import ordersReducer from "./slices/ordersSlice.js";
import usersReducer from "./slices/usersSlice.js";
import { productsApi } from "./slices/productsApi.js";

const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    users: usersReducer,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

const init = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      await store.dispatch(loadUser());
    }
  } catch (error) {
    console.error("Error initializing app:", error);
  }
};

init();

store.dispatch(productsFetch());
store.dispatch(getTotals());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
