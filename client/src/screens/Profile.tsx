import BlogCard from "@/components/BlogCard";
import DotLoader from "@/components/DotLoader";
import SpinnerLoader from "@/components/SpinLoader";
import Helpers from "@/config/Helpers";
import useGetAndDelete from "@/hooks/useGetAndDelete";
import usePostAndPut from "@/hooks/usePostAndPut";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaEdit, FaUser } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { IoSendSharp } from "react-icons/io5";

interface User {
    name: string;
    email: string;
    password: string;
    file: File | null | string;
}

const Profile = () => {
    const defaultUserData: User = {
        name: "",
        email: "",
        password: "",
        file: null,
    };
    const getUser = useGetAndDelete(axios.get);
    const getUserBlog = useGetAndDelete(axios.get);
    const editUser = usePostAndPut(axios.put);


    const [refresher, setRefresher] = useState<boolean>(false)
    const [showEditUserForm, setShowEditUserForm] = useState<boolean>(false)
    const [userData, setUserData] = useState<User>(defaultUserData);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const fetchUserBlog = async () => {
        await getUserBlog.callApi("blog/get-user-blogs", false, false);
    };
    const fetchUser = async () => {
        await getUser.callApi("user/get", false, false);
    };

    const handleEditUser = async () => {
        setShowEditUserForm(!showEditUserForm)
        setUserData({
            name: getUser?.response?.data?.name,
            email: getUser?.response?.data?.email,
            password: "",
            file: getUser?.response?.data.image,
        })
        setImagePreview(Helpers.imageUrl + getUser?.response?.data.image)
    }

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await editUser.callApi("user/edit", userData, false, true, true);
        setShowEditUserForm(!showEditUserForm)
    }

    const handleIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setUserData((prev) => ({ ...prev, ["file"]: file }))
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData((prev) => ({ ...prev, [id]: value }))
    };

    useEffect(() => {
        fetchUser();
    }, [showEditUserForm]);

    useEffect(() => {
        fetchUserBlog();
    }, [refresher]);

    return (
        <div className="min-h-full  flex flex-col items-center justify-center bg-white p-5">

            {
                showEditUserForm ?
                    <form
                        onSubmit={handleEditSubmit}
                        className="border border-gray-200 bg-gray-50  flex flex-col items-center max-w-lg w-full p-8 rounded-2xl space-y-5"
                    >
                        <div className="flex flex-col items-center space-y-3">
                            {imagePreview ? (
                                <>
                                    <img
                                        src={imagePreview}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full cursor-pointer object-cover border-4 border-blue-500 shadow-md hover:scale-105 transition-transform"
                                        onClick={handleIconClick}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </>
                            ) : (
                                <div
                                    className="flex items-center justify-center w-24 h-24 border-4 border-gray-300 rounded-full cursor-pointer hover:border-blue-500 transition"
                                    onClick={handleIconClick}
                                >
                                    <FaUser className="text-gray-400 w-12 h-12" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="w-full">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="John Doe..."
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                value={userData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="********"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                value={userData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-row w-full justify-between space-x-3">
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 w-full"
                            >
                                <IoSendSharp /> <span>Submit</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowEditUserForm(!showEditUserForm)}
                                className="flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 w-full"
                            >
                                <RxCross2 /> <span>Cancel</span>
                            </button>
                        </div>
                    </form>
                    :
                    <>
                        {getUser.loading ? (
                            <DotLoader />
                        ) : (
                            <div className="max-w-lg w-full rounded-2xl  overflow-hidden bg-gray-50 border border-gray-300">
                                <div className="p-6 flex flex-row flex-wrap items-center">
                                    <img
                                        className="w-32 h-32 rounded-full border-2 border-gray-200 object-cover"
                                        src={`${Helpers.imageUrl + getUser.response?.data?.image}`}
                                        alt={getUser.response?.data?.name || "User"}
                                    />
                                    <div className="m-5">
                                        <h2 className="mt-4 text-2xl font-bold text-gray-800">
                                            {getUser.response?.data?.name}
                                        </h2>
                                        {getUser.response?.data?.email && (
                                            <p className="mt-2 text-gray-600 text-sm">{getUser.response?.data?.email}</p>
                                        )}
                                    </div>
                                    <div className="mt-3 flex gap-4 w-full">
                                        <button
                                            onClick={handleEditUser}
                                            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                                            <FaEdit /> <span>Edit</span>
                                        </button>
                                        <button className="flex items-center justify-center gap-2 bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 transition duration-200">
                                            <RiDeleteBin4Fill /> <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {getUserBlog.loading ? <span className="mt-5" ><SpinnerLoader size="12" color="black" /></span> :
                            <BlogCard blogs={getUserBlog.response?.data} showBtn={true} setRefresher={setRefresher} refresher={refresher} />
                        }
                    </>
            }

        </div>
    );
};

export default Profile;
