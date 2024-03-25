import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import updatePasswordRequest from "../api/updatePasswordRequest";
import Header from "../components/Header";
import UpdatePasswordForm from '../components/Forms/updatePasswordForm';

const ChangePasswordPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const userId = localStorage.getItem('userId');

        if (!accessToken || !refreshToken || !userId) {
            navigate('/signin');
        }
    }, [navigate]); // Add `navigate` to the dependency array

    const handleSuccessfulPasswordUpdate = () => {
        alert("Password updated successfully");
        navigate("/items");
    }

    return (
        <div>
            <Header />
            <UpdatePasswordForm onSuccess={handleSuccessfulPasswordUpdate} />
        </div>
    );

}

export default ChangePasswordPage;