import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginRequest from "../api/loginRequest";
import googleLoginRequest from "../api/googleLoginRequest";
import Header from "../components/Header";
import LoginUserForm from '../components/Forms/loginUserForm';

const SignInPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        //check for google auth code in url
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log('Trying code: ', code);
        if (code) {
            const handleGoogleLogin = async () => {
                try {
                    console.log('Handling google login');
                    await googleLoginRequest(code);
                    console.log('Google login successful');
                    navigate('/signin');
                } catch (error: any) {
                    console.error("Error logging in with Google: ", error);
                }
            }
            handleGoogleLogin();
        }
    }, [navigate]);

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (accessToken && refreshToken && userId) {
            navigate('/items');
        }
    }, [navigate, accessToken, refreshToken, userId]); // Add `navigate` to the dependency array

    const handleSuccessfulLogin = async (email: string, password: string) => {
        try {
            await loginRequest(email, password);
            navigate("/items");
        } catch (error: any) {
            console.error("Error logging in: ", error);
        }
    }

    return (
        <div>
            <Header />
            <LoginUserForm onSuccess={handleSuccessfulLogin} />
        </div>
    );
};

export default SignInPage;