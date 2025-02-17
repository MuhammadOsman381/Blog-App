import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoIosImages } from "react-icons/io";
import { FaTags } from "react-icons/fa";
import Select from 'react-select';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Input } from '@/components/ui/input';
import usePostAndPut from '@/hooks/usePostAndPut';
import axios from 'axios';
import toast from 'react-hot-toast';
import useGetAndDelete from '@/hooks/useGetAndDelete';
import { wrapIntoFormData } from '@/services/FormHandling';
import { Brain } from 'lucide-react';
import SpinnerLoader from '@/components/SpinLoader';

const CreateBlog = () => {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [images, setImages] = useState<File[] | null>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<any>(null);
    const [selectedOption, setSelectedOption] = useState<string[]>([""]);
    const [tagName, setTagName] = useState<string>("");
    const [options, setOptions] = useState<any[]>([{ value: "", label: "" }]);
    const [tags, setTags] = useState<string[]>([""]);
    const [loading, setLoading] = useState<Boolean>(false);


    const post = usePostAndPut(axios.post)
    const getTag = useGetAndDelete(axios.get)


    let optionsArray: any = []

    const handleChange = (option: any) => {
        option.map((items: any) => {
            optionsArray.push(items.value)
        })
        setSelectedOption(option);
        setTags(optionsArray)
        console.log('Selected:', optionsArray);
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e?.target?.files;
        if (files) {
            const filesArray: File[] = Array.from(files);
            setImages(filesArray);
            const previewUrls = filesArray.map(file => URL.createObjectURL(file));
            setPreviews(previewUrls);
        }

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = wrapIntoFormData({
            title: title,
            description: description,
            file: images,
            tags: tags
        })
        const res = await post.callApi("blog/create", formData, false, true, true)
        console.log(res);
    };

    const createTag = async () => {
        await post.callApi("tag/create", { tagName }, false, false, true)
        getTags()

    }

    const createOptions = (tags: string[]) => {
        const newOptions: { value: string, label: string }[] = tags.map((tag: string) => ({ value: tag, label: tag }));
        setOptions(newOptions);
    };


    const getTags = async () => {
        const res = await getTag.callApi("tag/get-all-tags", false, false);
        const tags = res?.data?.map((item: any) => item.tagName) || [];
        createOptions(tags);
    };


    function removeEmptyStrings(array: string[]) {
        return array.filter(item => item !== "");
    }


    function formatResponse(text: string) {
        const paragraphs = text.trim().split('\n\n');
        let formattedText = '';
        paragraphs.forEach((item: string) => {
            if (item.trim().startsWith("**") && item.trim().endsWith("**")) {
                formattedText += `<strong class="text-xl text-gray-800">${item.trim().slice(2, -2)}</strong>`;
            } else if (item.trim().startsWith("*")) {
                const listItemsArray = item.trim().split("\n");
                formattedText += "<ul>";
                listItemsArray.forEach((listItem) => {
                    let formattedListItem = listItem.trim().slice(1).trim();
                    if (formattedListItem.trim().startsWith("**")) {
                        removeEmptyStrings(formattedListItem.trim().split("**")).map((items, index) => {
                            if (index === 0) {
                                formattedText += `<strong class="text-gray-700">${items.trim()}</strong>`;
                            } else {
                                formattedText += `<li>${items.trim()}</li>`;
                            }
                        });
                    } else {
                        formattedText += `<li>${formattedListItem.trim()}</li>`;
                    }
                });
                formattedText += "</ul>";
            } else {
                formattedText += `<p>${item.trim()}</p>`;
            }
        });

        return formattedText;
    }


    const generateBlogByAI = async () => {
        if (title == "") {
            toast.error("First enter the blog title")
        }
        else {
            setLoading(true)
            const prompt = `please generate blog for this title "${title}"`
            try {
                const response = await axios({
                    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDdERGCkujR4KDx-Pxri4eDZxvBNyR0B2A`,
                    method: 'post',
                    data: { contents: [{ parts: [{ text: prompt }] }] },
                });
                setLoading(false)
                setDescription(formatResponse(response.data.candidates[0].content.parts[0].text))
            } catch (error) {
                console.log(error)
                setLoading(false)

            }
        }
    }

    useEffect(() => {
        getTags()
    }, [])

    return (
        <div className='flex p-10 items-start justify-center w-full h-[90vh]' >
            <div className="w-full bg-gray-50 mx-auto p-6  border border-gray-200 rounded-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium text-lg mb-2">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-600"
                        />
                    </div>

                    <div className="container mb-4 w-auto h-[410px] overflow-auto ">
                        <label htmlFor="description" className=" text-gray-700 font-medium text-lg flex flex-row items-center justify-start gap-4  mb-2">
                            <span>
                                Description
                            </span>
                            <div className='flex items-center justify-start cursor-pointer gap-2 text-sm rounded-lg text-center  bg-black text-white py-2 px-3' >
                                {
                                    loading ?
                                        <span className='flex items-center justify-center gap-2 ' >
                                            <span>Generating</span>
                                            <SpinnerLoader color='white' size="5" />
                                        </span> :
                                        <span onClick={generateBlogByAI} className='flex items-center justify-center gap-2'>
                                            <span>Generate By AI</span> <Brain />
                                        </span>
                                }
                            </div>
                        </label>
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                            placeholder="Describe your blog here..."
                            className="container h-[300px] w-full "
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold text-lg mb-2">
                            Upload Images
                        </label>
                        <div className="flex items-center">
                            <IoIosImages
                                onClick={handleIconClick}
                                className="text-4xl cursor-pointer text-black  transition-colors"
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold text-lg mb-2">
                            Tags
                        </label>
                        <div className="flex w-full  items-start justify-start flex-col gap-2 ">

                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div className='flex items-center justify-start cursor-pointer gap-2 rounded-lg text-center  bg-black text-white py-1 px-3' >
                                        <span>Create your own</span> <FaTags />
                                    </div>

                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Enter your tag name</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="news, sports..."
                                                required
                                                value={tagName}
                                                onChange={(e) => setTagName(e.target.value)}
                                            />
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={createTag}
                                        >Create
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>


                            <Select
                                isMulti
                                value={selectedOption}
                                onChange={handleChange}
                                options={options}
                                placeholder="Select tag(s)..."
                                className="react-select-container w-full focus:outline-none focus:ring focus:border-gray-600"
                                classNamePrefix="react-select"
                            />
                        </div>

                    </div>


                    {previews.length > 0 && (
                        <div className="mb-4">
                            <p className="text-gray-700 font-medium text-lg mb-2">Selected Previews:</p>
                            <div className="flex flex-wrap gap-4">
                                {previews.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Preview ${index}`}
                                        className="w-24 h-24 object-cover rounded-md border border-gray-300"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-black  text-white rounded-md transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
