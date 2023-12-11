import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { TbPlus, TbMinus } from "react-icons/tb";

import { useDispatch } from "react-redux";
import {
    decreaseCart,
    increaseCart,
    removeFromCart,
} from "../../slices/cartSlice";
import { Link } from "react-router-dom";

const CartProduct = ({ cartItem }) => {
    const dispatch = useDispatch();
    return (
        <div className="flex gap-4 p-2 border rounded bg-slate-200 border-slate-300">
            <div className="p-3 overflow-hidden bg-white rounded">
                <Link to={`/menu/{cartItem._id}`}>
                    <img
                        src={cartItem.image?.url}
                        className="object-cover w-40 h-28"
                        alt="cart product"
                    />
                </Link>
            </div>
            <div className="flex flex-col w-full gap-1">
                <div className="flex justify-between">
                    <Link to={`/menu/{cartItem._id}`}>
                        <p className="text-lg font-semibold capitalize text-slate-600 md:text-xl">
                            {cartItem.name}
                        </p>
                    </Link>
                    <div
                        className="cursor-pointer text-slate-700 hover:text-red-500"
                        onClick={() => dispatch(removeFromCart(cartItem))}
                    >
                        <AiFillDelete />
                    </div>
                </div>
                <p className="text-base font-bold">
                    <span>{cartItem.price.toLocaleString()}</span>
                    <span className="text-red-500">₫</span>
                </p>
                {cartItem.optionOrder.map((option) => (
                    <p className="text-xs">
                        x1 {option.name} {`${option.price.toLocaleString()}₫`}
                    </p>
                ))}
                {cartItem.note && (
                    <p className="text-sm">Ghi chú: {cartItem.note}</p>
                )}
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        {cartItem.cartQuantity > 0 ? (
                            <button
                                className="p-1 mt-2 rounded bg-slate-300 hover:bg-slate-400"
                                onClick={() =>
                                    dispatch(decreaseCart(cartItem._id))
                                }
                            >
                                <TbMinus />
                            </button>
                        ) : (
                            <div
                                className="p-1 mt-2"
                                style={{ width: "23px" }}
                            ></div>
                        )}
                        <p className="p-1 mt-2 font-semibold">
                            {cartItem.cartQuantity}
                        </p>
                        <button
                            className="p-1 mt-2 rounded bg-slate-300 hover:bg-slate-400"
                            onClick={() => dispatch(increaseCart(cartItem._id))}
                        >
                            <TbPlus />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                        <p>Total:</p>
                        <p>
                            {cartItem.totalPrice.toLocaleString()}
                            <span className="text-red-500">₫</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
