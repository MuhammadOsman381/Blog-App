import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Helpers from '@/config/Helpers';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";
import useGetAndDelete from "@/hooks/useGetAndDelete";
import axios from "axios";

interface Blog {
    blogId: number;
    createdAt: string;
    description: string;
    images: string[];
    tags: string | string[];
    title: string;
    updatedAt: string;
    userId: number;
}

interface BlogCardProps {
    blogs: Blog[];
    showBtn: boolean;
    setRefresher: React.Dispatch<React.SetStateAction<boolean>>;
    refresher: boolean
}

const BlogCard = ({ blogs, showBtn, setRefresher, refresher }: BlogCardProps) => {

    const deleteBlog = useGetAndDelete(axios.delete)

    function getThirtyWords(text: string): string {
        const words = text.trim().split(/\s+/);
        if (words.length <= 40) return text;
        return `${words.slice(0, 40).join(" ")} ...`;
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setRefresher(!refresher)
        console.log(id)
    }

    const handleDelete = async (e: React.FormEvent, id: number) => {
        e.preventDefault();
        const response = await deleteBlog.callApi(`blog/delete-blog/${id}`, false, false)
        setRefresher(!refresher)
        console.log(response)
    }

    return (
        <div className="w-full h-auto p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-sm:p-5">
            {
                blogs?.length > 0 &&
                blogs.map((item) => (
                    <Link to={`/user/home/${item.blogId}`} className="border border-gray-300 rounded-2xl bg-gray-50 p-6 max-w-screen-sm" key={item.blogId}>
                        {item.images && item.images.length > 0 && (
                            <Carousel className='mb-4' >
                                <CarouselContent>
                                    {item.images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <img
                                                src={Helpers.imageUrl + image}
                                                alt={`Image ${index + 1}`}
                                                className="w-full h-64 object-cover border border-gray-300 rounded-2xl"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        )}
                        <h2 className="text-2xl text-gray-700 font-bold mb-2">{item.title}</h2>
                        <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: getThirtyWords(item.description) }}></p>

                        {
                            item.tags && (
                                typeof item.tags === 'string' ? (
                                    <div className="mt-4">
                                        <span className="bg-black text-white text-sm font-medium px-2 py-1.5 rounded-2xl">
                                            {item.tags}
                                        </span>
                                    </div>
                                ) : (
                                    Array.isArray(item.tags) && item.tags.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {item.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-black text-white text-sm font-medium px-2 py-1.5 rounded-2xl">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )
                                )
                            )
                        }

                        {
                            showBtn &&
                            <div className="flex items-center justify-start gap-1 mt-4">
                                <button
                                    className="bg-blue-600 text-center flex items-center justify-center gap-2 px-3 py-1 w-auto h-auto rounded-xl text-white"
                                    onClick={(e) => handleEdit(e, item.blogId)}
                                >
                                    <span>Edit</span> <FaEdit />
                                </button>
                                <button
                                    className="bg-red-600 flex items-center justify-center gap-2 px-3 py-1 w-auto h-auto rounded-xl text-white"
                                    onClick={(e) => handleDelete(e, item.blogId)}
                                >
                                    <span>
                                        Delete
                                    </span>
                                    <RiDeleteBin4Fill />
                                </button>
                            </div>
                        }
                    </Link>
                ))}
        </div>
    )
}

export default BlogCard;
