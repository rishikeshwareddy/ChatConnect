import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const signup = async ({ fullName, username, Password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, username, Password, confirmPassword, gender })
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "post",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, Password, confirmPassword, gender })
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, signup };
}

export default useSignUp

function handleInputErrors({ fullName, username, Password, confirmPassword, gender }) {
    if (!fullName || !username || !Password || !confirmPassword || !gender) {
        toast.error('please fill in all fields')
        return false;
    }
    if (Password != confirmPassword) {
        toast.error('passwords do not match')
        return false;
    }
    if (Password.length < 8) {
        toast.error('password should atleast have 8 characters')
        return false;
    }
    return true;
}