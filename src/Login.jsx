import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate,useLocation } from "react-router";

function Login() {
    const location = useLocation(); // Get passed data
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const endpoint = isRegister ? "/register" : "/login";

            // Send only relevant fields
            const requestData = isRegister
                ? data // Send all fields for registration
                : { username: data.username, password: data.password }; // Only send username & password for login

            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Ensures cookies are sent
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong");
            }

            if (isRegister) {
                alert("User Registered Successfully!");
                setIsRegister(false); // Switch to login after successful registration
            } else {
                alert("Login Successful!");
                navigate("/"); // Redirect to protected page
            }

        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isRegister ? "Register" : "Login"}
                </h2>

                {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    {isRegister && (
                        <>
                            <div>
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    {...register("fullName", { required: isRegister })}
                                    className="w-full p-2 border rounded mt-1"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm">Full name is required</p>}
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    {...register("email", { required: isRegister })}
                                    className="w-full p-2 border rounded mt-1"
                                />
                                {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                            </div>
                        </>
                    )}

                    <div className="mt-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            {...register("username", { required: true })}
                            className="w-full p-2 border rounded mt-1"
                        />
                        {errors.username && <p className="text-red-500 text-sm">Username is required</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true, minLength: 6 })}
                            className="w-full p-2 border rounded mt-1"
                        />
                        {errors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : isRegister ? "Register" : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}
                    <span
                        className="text-blue-500 cursor-pointer ml-1"
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? "Login" : "Register"}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
