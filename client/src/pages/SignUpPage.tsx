import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { Helmet } from "react-helmet";
import CreateUserForm from "../components/Forms/CreateUserForm";
import loginRequest from "../api/loginRequest";
import Header from "../components/Header";

const SignUpPage: React.FC = () => {
    const { trackPageView, enableLinkTracking } = useMatomo();

    enableLinkTracking();

    // Track page view
    useEffect(() => {
        trackPageView()
    }, []);
    
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
            <Helmet>
                <title>Gear Gremlin - Register</title>
                <meta name="description" content="Sign up for your free Gear Gremlin account here! Create your account with an email and password or login with Google!"/>
            </Helmet>
            <Header />
            <CreateUserForm email={email} onSuccess={handleSuccessfulLogin} />
        </div>
    );
};

export default SignUpPage;