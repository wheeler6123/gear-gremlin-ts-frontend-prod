import React, { FC, useState } from "react";
import updatePasswordRequest from "../../api/updatePasswordRequest";



interface UpdatePasswordFormProps {
    onSuccess?: (userId: string, newPassword: string) => void;
}

const UpdatePasswordForm: FC<UpdatePasswordFormProps> = ({ onSuccess }) => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const userId = localStorage.getItem("userId");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //form validation
        if (!userId || !newPassword) {
            alert("Please fill out all fields");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match");
            return;
        }

        if (userId == '6601b0d516ee4af0e40dad37'){
            alert("You cannot change the password for this user");
            return;
        }

        try {
            await updatePasswordRequest(userId, newPassword);
            setNewPassword("");
            setConfirmNewPassword("");
            setError(null);
            onSuccess && onSuccess(userId, newPassword);
        } catch (error: any) {
            console.error('Error updating password: ', error);
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
                        <h3 className="mb-4">Update Password</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-4">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-group mb-4">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm New Password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                            </div>
                            <button className="button shadow-2 mb-4">Update Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdatePasswordForm;