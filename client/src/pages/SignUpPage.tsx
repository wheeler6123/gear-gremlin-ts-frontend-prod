import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreateUserForm from "../components/Forms/CreateUserForm";
import loginRequest from "../api/loginRequest";
import Header from "../components/Header";

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");

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
            <CreateUserForm email={email} onSuccess={handleSuccessfulLogin} />
        </div>
    );
};

export default SignUpPage;