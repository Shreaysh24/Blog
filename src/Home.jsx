import React, { useState, useEffect,useRef } from "react";
import PostBTN from "./components/PostBTN";
import { motion, useScroll } from "motion/react";

import { useNavigate } from "react-router-dom";



function Home() {
    const [expandedIds, setExpandedIds] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigation

    const SY = useScroll().scrollYProgress;

    const handleEdit = (blog) => {
        navigate(`/Update/${blog.id}`, { state: { blog } }); // Pass blog data
    };

    // Fetch blogs from the backend when the component mounts
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/posts");
            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }
            const data = await response.json();
            setBlogs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleRead = (id) => {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete blog");
            }

            fetchBlogs();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="text-center py-10 text-lg">Loading...</div>;
    if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

    return (

        <div className="w-full min-h-screen bg-gradient-to-r from-violet-200 to-pink-200 p-10">

            <motion.div style={{
                scaleX: SY,
            }}
                className="z-10 patti h-3 w-full bg-slate-950  fixed origin-left left-0  top-0">

            </motion.div>

            {/* Post Button */}
            <PostBTN />

            {/* Title Section */}
            <div className="text-center mt-5">
                <h1 className="text-[8vw] font-bold text-gray-800">Blog iT</h1>
            </div>

            {/* Blog List */}
            <div className="mt-12 space-y-8">
                {blogs.map((blog) => (
                    <motion.div
                        whileHover={{ scale: 1.1, ease: "easeIn" }}
                        key={blog.id} className="max-w-4xl mx-auto">
                        <div className="relative group bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                            {/* Gradient Background Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100 to-pink-200 rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>

                            <div className="relative p-6">
                                {/* Header Section */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        {/* Icon */} {/* Blog Title & Author */}
                                        <div>
                                            <p className="text-xl font-semibold text-gray-800">{blog.Title}</p>
                                            <p className="text-indigo-600">{blog.AName}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">

                                        {/* Delete Button */}
                                        <motion.button whileTap={{ scale: 5 }} onClick={() => handleDelete(blog.id)} className="text-red-600 hover:text-red-800 transition">
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                            </svg>
                                        </motion.button>
                                        <motion.button  onClick={() => handleEdit(blog)} >
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 125.7-86.8 86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" /></svg>
                                        </motion.button>
                                    </div>

                                </div>

                                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedIds.includes(blog.id) ? "max-h-full" : "max-h-[120px]"}`}>
                                    <p className="text-gray-700 mt-3">{blog.Blog}</p>
                                </div>

                                <div className="text-center mt-4">
                                    <button onClick={() => toggleRead(blog.id)} className="text-blue-500 font-semibold hover:underline">
                                        {expandedIds.includes(blog.id) ? "Show Less..." : "Read More..."}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Home;
