import React, { FC, useState } from "react";    
import loginRequest from "../../api/loginRequest";
import getGoogleOAuthUrl from "../../services/getGoogleUrl";


interface LoginUserFormProps {
    onSuccess?: (email: string, password: string) => void;
}


const LoginUserForm: FC<LoginUserFormProps> = ({ onSuccess }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //form validation
        if (!email || !password) {
            alert("Please fill out all fields");
            return;
        }

        try {
            await loginRequest(email, password);
            setEmail("");
            setPassword("");
            setError(null);
            onSuccess && onSuccess(email, password);
        } catch (error: any) {
            console.error('Error logging in: ', error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-content">
                <div className="auth-bg">
                    <span className="r"></span>
                    <span className="r s"></span>
                    <span className="r s"></span>
                    <span className="r"></span>
                </div>
                <div className="card">
                    <div className="card-body text-center">
                        {error && <p className="text-danger">{error}</p>}
                        <div className="mb-4">
                            <i className="feather icon-unlock auth-icon"></i>
                        </div>
                        <h3 className="mb-4">Login</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group mb-4">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="button shadow-2 mb-4">Login</button>
                        </form>
                        <p className="mb-0 text-muted">
                            Want to login with Google?{' '}
                            <a href={getGoogleOAuthUrl()}>Google Login</a>
                        </p>
                        <p className="mb-0 text-muted">
                            Don't have an account?{' '}
                            <a href="/signup">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginUserForm;