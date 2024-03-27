import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
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
        alert("Password upated successfully");
        navigate("/items");
    }

    return (
        <div>
            <Helmet>
                <title>Gear Gremlin</title>
                <meta name="description" content="Change your Gear Gremlin password here"/>
            </Helmet>
            <Header />
            <UpdatePasswordForm onSuccess={handleSuccessfulPasswordUpdate} />
        </div>
    );

}

export default ChangePasswordPage;