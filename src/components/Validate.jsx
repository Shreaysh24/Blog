import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Validate() {
    const navigate = useNavigate(); // React Router navigation

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        try {
            const res = await fetch('http://localhost:5000/validate', {
                method: 'GET',
                credentials: "include",
            });

            if (!res.ok) throw new Error("Invalid token"); // If response is not 200

            const data = await res.json();
            if (!data.valid) throw new Error("Unauthorized"); // If server response says invalid
        } catch (error) {
            navigate('/login'); // Redirect user to login if validation fails
        }
    };

    return null; 
}

export default Validate;
