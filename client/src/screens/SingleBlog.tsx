import Helpers from "@/config/Helpers";
import useGetAndDelete from "@/hooks/useGetAndDelete";
import usePostAndPut from "@/hooks/usePostAndPut";
import axios from "axios";
import { Heart, Send } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";


interface Comment {
    commentId: number;
    blogId: number;
    comment: string;
    userId: number;
    userName: string;
    userImage: string;
    createdAt: string;
    updatedAt: string;
}

const SingleBlog = () => {
    const [comment, setComment] = useState("");
    const { blogId } = useParams();
    const get = useGetAndDelete(axios.get);
    const post = usePostAndPut(axios.post);
    const deleteComment = useGetAndDelete(axios.delete);
    const getSingleBlog = async () => {
        await get.callApi(`blog/get-blog/${blogId}`, false, false);
    };

    const handleLike = () => {
        console.log("Liked!");
    };
    const handleSendComment = async () => {
        if (comment.trim() === "") {
            toast.error("Please enter your comment!")
            return
        }
        else {
            await post.callApi(`comment/add/${blogId}`, { comment }, false, false, false)
            setComment("");
            await getSingleBlog()
        }
    };
    const handleCommentDelete = async (id: number) => {
        await deleteComment.callApi(`comment/delete/${id}`, false, false)
        await getSingleBlog();
    }

    useEffect(() => {
        getSingleBlog();
    }, [blogId]);

    const blog = get?.response?.data?.blog;
    const userId = get?.response?.data?.user;


    return (
        <div className="p-10">
            <div className="max-w-full mx-auto p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                {blog ? (
                    <>
                        {blog.images && blog.images.length > 0 && (
                            <div className="relative w-full overflow-hidden scrollbar-hide">
                                <div className="flex gap-4 overflow-x-auto scrollbar-hide p-2">
                                    {blog.images.map((image: string, index: number) => (
                                        <img
                                            key={index}
                                            src={Helpers.imageUrl + image}
                                            alt={`Blog Image ${index + 1}`}
                                            className="w-[400px] h-64 object-cover rounded-md flex-shrink-0"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <h1 className="text-3xl font-bold mb-2 mt-3">{blog.title}</h1>

                        {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-3 mb-2 flex flex-wrap gap-2">
                                {Array.isArray(blog.tags)
                                    ? blog.tags.map((tag: string, index: number) => (
                                        <span
                                            key={index}
                                            className="bg-black text-white text-sm font-medium px-2 py-1.5 rounded-2xl">
                                            {tag}
                                        </span>
                                    ))
                                    : <span
                                        className="bg-black text-white text-sm font-medium px-2 py-1.5 rounded-2xl">
                                        {blog.tags}
                                    </span>
                                }
                            </div>
                        )}

                        <div
                            className="text-gray-700 mt-4"
                            dangerouslySetInnerHTML={{ __html: blog.description }}
                        />


                        <div className="mt-3 w-full">
                            <div className="flex flex-col w-full items-center  gap-2 border border-gray-300 rounded-lg p-4">

                                <div className="bg-white w-full p-4 rounded-lg  border border-gray-300">
                                    <h2 className="text-lg font-semibold mb-3 text-gray-800">Comments</h2>
                                    {blog?.comments?.length > 0 ? (
                                        blog.comments.map((comment: Comment, index: number) => (
                                            <div
                                                key={index}
                                                className="border border-gray-300 flex flex-row items-center justify-between rounded-lg py-3 px-5 mb-3 "
                                            >
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={Helpers.imageUrl + comment.userImage}
                                                            alt={comment.userName}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-semibold ">{comment.userName}</p>
                                                            <p className="text-gray-500 text-xs">
                                                                {new Date(comment.createdAt).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 ml-10 text-gray-700">{comment.comment}</p>
                                                </div>

                                                {
                                                    comment.userId == userId &&
                                                    <button
                                                        onClick={() => handleCommentDelete(comment.commentId)}
                                                        className="text-white bg-red-600 p-2 rounded-xl pointer-cursor" >
                                                        <RiDeleteBin4Fill />
                                                    </button>
                                                }

                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No comments yet.</p>
                                    )}
                                </div>

                                <textarea
                                    placeholder="Write a comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="flex w-full p-5  outline-none h-[200px] border border-gray-300 rounded-lg text-gray-700"
                                />


                                <div className="flex flex-row items-center justify-start gap-2 w-full" >

                                    <button
                                        onClick={handleLike}
                                        className="flex items-center justify-center gap-1 bg-red-600 text-white px-3 py-2 rounded-xl hover:bg-red-700 transition duration-200"
                                    >
                                        <Heart size={18} /> <span>Like</span>
                                    </button>

                                    <button
                                        onClick={handleSendComment}
                                        className="flex items-center justify-center gap-1 bg-black text-white px-3 py-2 rounded-xl  transition duration-200"
                                    >
                                        <Send size={18} /> <span>Send</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </>
                ) : (
                    <p className="text-center text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default SingleBlog;
