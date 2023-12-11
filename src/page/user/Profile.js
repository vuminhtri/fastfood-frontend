import userImg from "../../asset/user.png";
import bgProfile from "../../asset/background-profile.png";

import ChangePassword from "../../components/user/ChangePassword";
import ProfileTabs from "../../components/user/ProfileTabs";
import { useSelector } from "react-redux";
import { useState } from "react";
const Profile = () => {
    window.scrollTo(0, 0);
    const [selectedTab, setSelectedTab] = useState("editInfo");
    const auth = useSelector((state) => state.auth);
    const dateJoin = new Date(auth.createdAt);
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
    return (
        <>
            <div className="flex gap-20 container px-5 mx-auto lg:mt-12 mt-4">
                <div className="w-full lg:w-1/4 shadow mb-3">
                    <div className="relative pb-0 md:pb-3 bg-white">
                        <div className="h-[100px] w-full bg-cover">
                            <img
                                className="h-full w-full"
                                src={bgProfile}
                                alt="background-profile"
                            />
                        </div>
                        <div className="px-5 py-3 flex">
                            <div className="px-0 py-5 md:w-2/5">
                                <img
                                    className="w-[100px] h-[100px] object-contain rounded-full -mt-24 shadow-lg"
                                    src={userImg}
                                    alt="user-profile"
                                />
                            </div>
                            <div className="md:w-3/5">
                                <h5 className="mb-2">
                                    <strong>{auth.name}</strong>
                                </h5>
                                <span>
                                    Joined {dateJoin.getDate()} {dateJoin.toLocaleString('en-US', { month: 'long' })} {dateJoin.getFullYear()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-start">
                            <div className="flex flex-col items-start col-span-12 w-full ">
                                <button
                                    className={`px-6 py-4 bg-white w-full text-start text-base border border-solid border-[#e4e4e4] ${
                                        selectedTab === "editInfo"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => handleTabClick("editInfo")}
                                >
                                    Edit Information
                                </button>
                                <button
                                    className={`px-6 py-4 bg-white w-full text-start text-base border border-solid border-[#e4e4e4] ${
                                        selectedTab === "changePassword"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleTabClick("changePassword")
                                    }
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-3/4 pb-5 lg:pt-0 pt-3">
                    {selectedTab === "editInfo" ? (
                        <ProfileTabs />
                    ) : (
                        <ChangePassword />
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
