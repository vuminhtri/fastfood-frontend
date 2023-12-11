import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { editUserPassword } from "../../slices/authSlice";

const ChangePassword = () => {
    const auth = useSelector((state) => state.auth);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newProfile, setNewProfile] = useState({
        id: auth._id,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const dispatch = useDispatch();

    const handleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };
    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setNewProfile((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(editUserPassword(newProfile));
    };
    return (
        <>
            <form
                className="flex flex-col w-2/5 m-7 pl-20"
                onSubmit={handleSubmit}
            >
                <div className="mb-3">
                    <label
                        htmlFor="account-cur-pass"
                        className="block text-base font-semibold text-gray-600"
                    >
                        Current Password
                    </label>
                    <div className="flex px-3 py-2 mt-1 rounded-md bg-white focus-within:border focus-within:border-indigo-500">
                        <input
                            id="currentPassword"
                            className="w-full border-none outline-none"
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={newProfile.currentPassword}
                            onChange={handleOnChange}
                        />
                        <span
                            className="flex pt-1 text-xl cursor-pointer"
                            onClick={handleShowCurrentPassword}
                        >
                            {showCurrentPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="account-new-pass"
                        className="block text-base font-semibold text-gray-600"
                    >
                        New Password
                    </label>
                    <div className="flex px-3 py-2 mt-1 rounded-md bg-white focus-within:border focus-within:border-indigo-500">
                        <input
                            id="newPassword"
                            className="w-full border-none outline-none"
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={newProfile.newPassword}
                            onChange={handleOnChange}
                        />
                        <span
                            className="flex pt-1 text-xl cursor-pointer"
                            onClick={handleShowNewPassword}
                        >
                            {showNewPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="account-confirm-pass"
                        className="block text-base font-semibold text-gray-600"
                    >
                        Confirm Password
                    </label>
                    <div className="flex px-3 py-2 mt-1 rounded-md bg-white focus-within:border focus-within:border-indigo-500">
                        <input
                            id="confirmPassword"
                            className="w-full border-none outline-none"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={newProfile.confirmPassword}
                            onChange={handleOnChange}
                        />
                        <span
                            className="flex pt-1 text-xl cursor-pointer"
                            onClick={handleShowConfirmPassword}
                        >
                            {showConfirmPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    {auth.editPasswordStatus === "rejected" ? (
                        <p className=" flex w-full text-start text-sm text-red-600">{auth.editPasswordError}</p>
                    ) : null}
                    <button
                        type="submit"
                        className="w-1/2 bg-green-500 text-white py-3 px-4 mt-4 rounded-md uppercase text-sm font-semibold"
                    >
                        {auth.editPasswordStatus === "pending" ? "Submitting" : "Confirm"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default ChangePassword;
