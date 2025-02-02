import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Update() {
    const location = useLocation(); // Get passed data
    const navigate = useNavigate();
    const blog = location.state?.blog || {}; 
    const [form, setForm] = useState( {AName: blog.AName || "",
        Title: blog.Title || "",
        Blog: blog.Blog || ""});
    const [enabled, setenabled] = useState(false)

    useEffect(() => {
        console.log(form.AName && form.Blog && form.Title);

        const valid = form.AName && form.Blog && form.Title;
        setenabled(valid);

    }, [form])


    


    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/posts/${blog.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error("Failed to update blog");
            }

            alert("Blog updated successfully!");
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Failed to update post.");
        }
    };

    return (
        <>
            <div className="absolute inset-0 h-full w-full bg-gray-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className='flex bottom-3 fixed right-5'>

                </div>
                <form onSubmit={handleUpdate} className="container form px-32 py-5">
                    <p className='text-white font-extrabold'>Name</p>
                    <input name='AName' value={form.AName || ''} onChange={handleChange} type="text" className='w-full pl-3 font-bold text-sm focus:outline-none rounded-sm text-black' />
                    <p className='text-white font-extrabold'>Title</p>
                    <input name='Title' value={form.Title || ''} onChange={handleChange} type="text" className='w-full pl-3 font-bold text-sm focus:outline-none rounded-sm text-black' />
                    <p className='text-white font-extrabold'>Blog</p>
                    <textarea name='Blog' value={form.Blog || ''} onChange={handleChange} className='w-full h-80 resize-none pl-3 font-bold text-sm focus:outline-none rounded-sm text-black' />
                    <div className='flex w-full justify-center items-center my-2'>
                        <button disabled={!enabled} type="submit" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2" >Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Update