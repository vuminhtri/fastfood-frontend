import React, { useState } from "react";
import userImg from "../../asset/user.png";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, loadUser } from "../../slices/authSlice";

const ProfileTabs = () => {
    const auth = useSelector((state) => state.auth);
    const [newProfile, setNewProfile] = useState({
        id: auth._id,
        name: auth.name,
        email: auth.email,
        phone: auth.phone ? auth.phone : null,
        gender: auth.gender ? auth.gender : null,
        day: auth.dob ? auth.dob.split('/')[0] : null,
        month: auth.dob ? auth.dob.split('/')[1] : null,
        year: auth.dob ? auth.dob.split('/')[2] : null,
        image: auth.image?.url,
    });

    const dispatch = useDispatch();

    const days = Array.from(
        { length: 31 },
        (_, i) => StandardizeNumber(i + 1)
    );
    const months = Array.from({ length: 12 }, (_, i) => StandardizeNumber(i + 1));
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) =>
        (currentYear - i).toString()
    );

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];

        TransformFileData(file);
    };

    const TransformFileData = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setNewProfile((prev) => {
                    return {
                        ...prev,
                        image: reader.result,
                    }
                })
            };
        } else {
            setNewProfile((prev) => {
                return {
                    ...prev,
                    image: "",
                }
            });
        }
    };

    function StandardizeNumber(i) {
        return i < 10 ? `0${i}` : `${i}`
    }

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
        console.log(newProfile)
        dispatch(editUserProfile(newProfile));
        dispatch(loadUser());
    };
    return (
        <>
            <div className="border-b border-b-solid border-b-gray-300 p-4 mb-3">
                <h1 className="font-medium text-lg capitalize">My Profile</h1>
                <p className="text-sm text-gray-600">Manage your account</p>
            </div>
            <div className="w-full flex flex-row my-8">
                <table className="w-3/5 max-w-2xl gap-6 p-6 ml-10 border-r border-r-solid border-r-gray-300">
                    <tbody>
                        <tr className="h-14">
                            <td className="pr-6 w-32 text-base font-semibold text-end text-gray-600">Name:</td>
                            <td>
                                <input
                                    id="name"
                                    className="w-60 px-3 py-1.5 border rounded-md focus:border-indigo-500 focus:outline-none"
                                    type="text"
                                    name="name"
                                    value={newProfile.name}
                                    onChange={handleOnChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr className="h-14">
                            <td className="pr-6 w-32 text-base font-semibold text-end text-gray-600">Email:</td>
                            <td>
                                <p
                                    className="block w-60 px-3 py-1.5 border rounded-md focus:border-indigo-500 focus:outline-none"
                                >{newProfile.email}</p>
                            </td>
                        </tr>
                        <tr className="h-14">
                            <td className="pr-6 w-32 text-base font-semibold text-end text-gray-600">Phone:</td>
                            <td>
                                <input
                                    id="phone"
                                    className="w-60 px-3 py-1.5 border rounded-md focus:border-indigo-500 focus:outline-none"
                                    type="text"
                                    name="phone"
                                    value={newProfile.phone}
                                    onChange={handleOnChange}
                                />
                            </td>
                        </tr>
                        <tr className="h-14">
                            <td className="pr-6 w-32 text-base font-semibold text-end text-gray-600">Gender:</td>
                            <td>
                                <div className="flex flex-row ml-5 gap-5">
                                    <label>
                                        <input
                                            className="mx-1"
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            value="Male"
                                            onChange={handleOnChange}
                                            checked={newProfile.gender === "Male"}
                                        />
                                        Male
                                    </label>
                                    <label>
                                        <input
                                            className="mx-1"
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="Female"
                                            onChange={handleOnChange}
                                            checked={newProfile.gender === "Female"}
                                        />
                                        Female
                                    </label>
                                    <label>
                                        <input
                                            className="mx-1"
                                            type="radio"
                                            id="other"
                                            name="gender"
                                            value="Other"
                                            onChange={handleOnChange}
                                            checked={newProfile.gender === "Other"}
                                        />
                                        Other
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-6 w-32 text-base font-semibold text-end text-gray-600">Date of Birth:</td>
                            <td>
                                <select
                                    className="mr-2 p-1 border rounded-sm focus:border-indigo-500 focus:outline-none"
                                    id="day"
                                    name="day"
                                    value={newProfile.day}
                                    onChange={handleOnChange}
                                >
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                            Ngày {day}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="mr-2 p-1 border rounded-sm focus:border-indigo-500 focus:outline-none"
                                    id="month"
                                    name="month"
                                    value={newProfile.month}
                                    onChange={handleOnChange}
                                >
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                            Tháng {month}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="p-1 border rounded-sm focus:border-indigo-500 focus:outline-none"
                                    id="year"
                                    name="year"
                                    value={newProfile.year}
                                    onChange={handleOnChange}
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            Năm {year}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>


                </table>
                <div className="flex flex-col w-2/5 items-center">
                    <img
                        className="w-[100px] h-[100px] object-contain rounded-full shadow-lg"
                        src={newProfile.image ? newProfile.image : userImg}
                        alt="user-profile"
                    />
                    <label
                        htmlFor="profileImage"
                        className="mt-5 w-fit p-3 text-center cursor-pointer"
                    >
                        <div className="w-full p-1 text-sm text-center text-black transition-opacity duration-300 cursor-pointer bg-white hover:opacity-70">
                            Select User Image
                        </div>
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProductImageUpload}
                        />
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className="w-1/2 bg-green-500 text-white py-3 px-4 mt-4 rounded-md uppercase text-sm font-semibold"
                onClick={handleSubmit}
            >
                Update Profile
            </button>
        </>
    );
};

export default ProfileTabs;
