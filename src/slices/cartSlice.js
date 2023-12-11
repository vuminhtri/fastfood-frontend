import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    // cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            console.log(action.payload)
            const existingIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (existingIndex >= 0) {
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity:
                        state.cartItems[existingIndex].cartQuantity + 1,
                };
            } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProductItem);
                toast.success(`Added ${tempProductItem.name} to cart`, {
                    position: "top-center",
                    hideProgressBar: true,
                    autoClose: 2000,
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            // const nextCartItems = state.cartItems.filter(
            //     (cartItem) => cartItem.id !== action.payload
            // );

            // state.cartItems = nextCartItems;
            const indexItem = state.cartItems.findIndex(
                (cartItem) => cartItem._id === action.payload
            );
            state.cartItems.splice(indexItem, 1);
            toast("Product removed from cart", {
                position: "bottom-left",
                hideProgressBar: true,
                autoClose: 1500,
                style: { background: "#e74c3c", color: "white" },
            });

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        increaseCart(state, action){
            const existingIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload
            );
            state.cartItems[existingIndex] = {
                ...state.cartItems[existingIndex],
                cartQuantity:
                    state.cartItems[existingIndex].cartQuantity + 1,
            };
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload
            );
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const indexItem = state.cartItems.findIndex(
                    (cartItem) => cartItem._id === action.payload
                );
                state.cartItems.splice(indexItem, 1);
                toast("Product removed from cart", {
                    position: "top-center",
                    hideProgressBar: true,
                    autoClose: 1500,
                    style: { background: "#e74c3c", color: "white" },
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotals(state) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { totalPrice, cartQuantity } = cartItem;
                    const itemTotal = totalPrice * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                { total: 0, quantity: 0 }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart(state) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, removeFromCart, decreaseCart, increaseCart, getTotals, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
