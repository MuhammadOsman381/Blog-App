import BlogCard from '@/components/BlogCard';
import useGetAndDelete from '@/hooks/useGetAndDelete';
import axios from 'axios';
import { useEffect } from 'react';

const Home = () => {
    const get = useGetAndDelete(axios.get);

    const getAllBlogs = async () => {
        await get.callApi("blog/get-all-blogs", false, false);
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <BlogCard blogs={get?.response?.data} showBtn={false} setRefresher={null as any} refresher={null as any} />
    );
};

export default Home;
