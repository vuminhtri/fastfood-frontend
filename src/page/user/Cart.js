import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyCartImage from "../../asset/empty.gif";
// import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import axios from "axios";
import CartProduct from "../../components/user/CartProduct";
import { url } from "../../slices/api";
import { getTotals } from "../../slices/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    // const user = useSelector((state) => state.user);

    // const {cartItems, cartTotalQuantity, cartTotalAmount} = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const totalPrice = productCartItem.reduce(
    //     (acc, curr) => acc + parseInt(curr.total),
    //     0
    // );
    // const totalQty = productCartItem.reduce(
    //     (acc, curr) => acc + parseInt(curr.qty),
    //     0
    // );

    // const handlePayment = async () => {
    //     if (user.email) {
    //         const stripePromise = await loadStripe(
    //             process.env.REACT_APP_STRIPE_PUBLIC_KEY
    //         );
    //         const res = await fetch(
    //             `${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "content-type": "application/json",
    //                 },
    //                 body: JSON.stringify(productCartItem),
    //             }
    //         );
    //         if (res.statusCode === 500) return;
    //         const data = await res.json();

    //         toast("Redirect to payment Gateway...!")
    //         stripePromise.redirectToCheckout({ sessionId: data })
    //     } else {
    //         toast.error("You have not login!")
    //         setTimeout(() => {
    //             navigate("/login")
    //         }, 1000)
    //     }
    // };

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleCheckout = () => {
        toast("Redirect to payment Gateway...!", {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 1500,
        })
        axios
            .post(`${url}/stripe/create-checkout-session`, {
                cart: cart.cartItems,
                userId: auth._id
            })
            .then((response) => {
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            })
            .catch((err) => console.log(err.message));
    };
    return (
        <div className="p-2 md:p-4">
            <h2 className="text-lg font-bold md:text-2xl text-slate-600">
                Your Cart Items
            </h2>
            <div className="">
                {cart.cartItems.length ? (
                    <div className="flex gap-3 my-4">
                        {/* Display cart items */}
                        <div className="w-full max-w-3xl">
                            {cart.cartItems.map((cartItem) => {
                                return (
                                    <CartProduct
                                        key={cartItem._id}
                                        cartItem = {cartItem}
                                    />
                                );
                            })}
                        </div>

                        {/* Total cart items */}
                        <div className="w-full max-w-md ml-auto">
                            <p className="bg-blue-500 text-white p-2 text-lg">
                                Summary
                            </p>
                            <div className="flex w-full py-2 text-lg border-b">
                                <p>Total Quantity :</p>
                                <p className="ml-auto w-32 font-bold">
                                    {cart.cartTotalQuantity}
                                </p>
                            </div>
                            <div className="flex w-full py-2 text-lg border-b">
                                <p>Total Price :</p>
                                <p className="ml-auto w-32 font-bold">
                                    {cart.cartTotalAmount.toLocaleString()}{" "}
                                    <span className="text-red-500">₫</span>
                                </p>
                            </div>
                            <div className="flex w-full py-2 text-lg border-b text-center">
                                <p className="text-sm font-extralight mx-2">Taxes and shipping calculated at checkout</p>
                            </div>
                            <div className="flex justify-center">
                                {auth._id ? (
                                    <button
                                        className="bg-red-500 hover:bg-red-600 w-1/2 text-lg font-bold py-2 text-white rounded-md"
                                        onClick={handleCheckout}
                                    >
                                        Check out
                                    </button>

                                ) : (
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 w-1/2 text-lg font-bold py-2 text-white rounded-md"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login to Check out
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center justify-center w-full">
                            <img
                                src={emptyCartImage}
                                className="w-full max-w-sm"
                                alt="emptyCart"
                            />
                            <p className="text-3xl font-bold text-slate-500">
                                Empty Cart
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
