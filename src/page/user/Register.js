import { useState, useEffect } from "react";
import loginsignupimg from "../../asset/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        if (auth._id) {
            navigate("/cart");
        }
    }, [auth._id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = user;
        if (password === confirmPassword) {
            dispatch(registerUser(user));
        }
    };

    return (
        <div className="p-3 md:p-4">
            <div className="flex flex-col items-center w-full max-w-sm p-4 m-auto bg-white">
                <h1 className="text-3xl font-bold text-center">Sign up</h1>

                <form
                    className="flex flex-col w-11/12 py-3"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="name"
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                        className="w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300"
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="email"
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        className="w-full px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline-blue-300"
                    />

                    <label htmlFor="password">Password</label>
                    <div className="flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            className="w-full border-none outline-none bg-slate-200"
                        />
                        <span
                            className="flex pt-1 text-xl cursor-pointer"
                            onClick={handleShowPassword}
                        >
                            {showPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <div className="flex px-2 py-1 mt-1 mb-2 rounded bg-slate-200 focus-within:outline focus-within:outline-blue-300">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="password"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    confirmPassword: e.target.value,
                                })
                            }
                            className="w-full border-none outline-none bg-slate-200"
                        />
                        <span
                            className="flex pt-1 text-xl cursor-pointer"
                            onClick={handleShowConfirmPassword}
                        >
                            {showConfirmPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>

                    <button className=" w-full max-w-[150px] m-auto bg-blue-300 hover:bg-blue-500 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                        {auth.registerStatus === "pending"
                            ? "Submitting..."
                            : "Register"}
                    </button>

                    {auth.registerStatus === "rejected" ? (
                        <p className="text-sm text-red-600">{auth.registerError}</p>
                    ) : null}
                </form>

                <p className="mt-2 text-sm">
                    Already have account?{" "}
                    <Link to={"/login"} className="text-blue-400 underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
