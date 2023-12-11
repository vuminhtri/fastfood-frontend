import React, { useEffect, useState } from "react";
// import loginsignupimg from "../asset/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    // console.log(user);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (auth._id) {
            if (cart.cartItems._id) {
                navigate("/cart");
            }
            else {
                navigate("/");
            }
        }
    }, [auth._id, cart.cartItems._id, navigate]);


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(user);
        dispatch(loginUser(user));
    };

    // const handleSubmit = async (e) => {
    //     console.log(user)
    //     e.preventDefault();
    //     const { email, password } = user;
    //     if (email && password) {
    //         const fetchUser = await fetch(
    //             `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "content-type": "application/json",
    //                 },
    //                 body: JSON.stringify(user),
    //             }
    //         );

    //         const userRes = await fetchUser.json();
    //         console.log(userRes);
    //         if (userRes.alert) {
    //             toast.success(userRes.message);
    //             dispatch(loginRedux(userRes));
    //             setTimeout(() => {
    //                 navigate("/");
    //             }, 1000);
    //         } else {
    //             toast.error(userRes.message);
    //         }
    //     } else {
    //         toast.error("Please enter required fields!");
    //     }
    // };
    return (
        <div className="p-3 md:p-4">
            <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
                <h1 className="text-center text-3xl font-bold">Login</h1>
                {/* <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
                    <img src={loginsignupimg} className="w-full" alt=""/>
                </div> */}

                <form
                    className="w-11/12 py-3 flex flex-col"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    />

                    <label htmlFor="password">Password</label>
                    <div className="flex mt-1 mb-2 bg-slate-200 px-2 py-1 rounded focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full bg-slate-200 border-none outline-none"
                        />
                        <span
                            className="flex pt-1 text-xl cursor-pointer"
                            onClick={handleShowPassword}
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <button className=" w-full max-w-[150px] m-auto bg-blue-300 hover:bg-blue-500 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                    {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
                    </button>
                    {auth.loginStatus === "rejected" ? <p className="text-sm text-red-600">{auth.loginError}</p> : null}

                </form>

                <p className="text-sm mt-2">
                    Don't have account?{" "}
                    <Link to={"/register"} className="text-blue-400 underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
