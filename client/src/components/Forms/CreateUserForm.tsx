import React, { useState, FC } from "react";
import createUserRequest from "../../api/createUserRequest";
import getGoogleOAuthUrl from "../../services/getGoogleUrl";

interface CreateUserFormProps {
    email: string | null;
    onSuccess?: (email: string, password: string) => void;
}


const CreateUserForm: FC<CreateUserFormProps> = ({ email: initialEmail, onSuccess }) => {
    const [email, setEmail] = useState<string>(initialEmail ?? "");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //form validation
        if(password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        } else if (!email || !password) {
            alert("Please fill out all fields");
            return;
        } else if(password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        } else if(!email.includes("@")) {
            alert("Please enter a valid email");
            return;
        }

        try {
            await createUserRequest(email, password);
            setPassword("");
            setError(null);
            onSuccess && onSuccess(email, password);
        } catch (error: any) {
            console.error('Error creating user: ', error);
            if(error.response && error.response.data && error.response.data.message) {
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
                        {error && <p className="text-danger">{error}</p>} {/* Render error message */}
                        <div className="mb-4">
                            <i className="feather icon-user-plus auth-icon"></i>
                        </div>
                        <h3 className="mb-4">Sign up</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    id='email'
                                    name='email'
                                    className="form-control"
                                    placeholder="Email"
                                    value={email ?? ""}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="input-group mb-4">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />                                
                            </div>
                            <div className="input-group mb-4">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm Your Password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                            <button className="button shadow-2 mb-4">Sign up</button>
                        </form>
                        <p className="mb-0 text-muted">
                            Want to use your Google account instead?{' '}
                            <br />
                            <a href={getGoogleOAuthUrl()}>Login with Google</a>
                        </p>
                        <p className="mb-0 text-muted">
                            Already have an account?{' '}
                            <a href="/signin">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUserForm;