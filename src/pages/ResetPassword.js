import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../style/LoginRegister.css";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [newPass, setNewPass] = useState();
    const [checkNewPass, setCheckNewPass] = useState();
    const handleResetPass = async () => {
        try {
            if(newPass === checkNewPass) {
                const res = await axios.post(
                    `${process.env.REACT_APP_API}/app/v1/auth/reset-password`,
                    { email, newPass }
                );
                if (res.data.success) {
                    toast.success(res.data.message);
                    navigate("/login");                
                } else {
                    toast.error(res.data.message);
                }
                // console.log(newPass);
            }else {
                toast.error("Please enter again.")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title="Login-Bazar">
            <div className="login-register">
                <div className="login-register-card">
                    <h3>Reset Password</h3>
                    <input
                        type="email"
                        placeholder="Enter Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter Your New Password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Re-enter Your New Password"
                        value={checkNewPass}
                        onChange={(e) => setCheckNewPass(e.target.value)}
                        required
                    />
                    <button onClick={handleResetPass}>Reset</button>
                    <hr />
                    <h6>
                        Remember Password ?{" "}
                        <Link className="login-register-link" to="/login">
                            login
                        </Link>
                    </h6>
                </div>
            </div>
        </Layout>
    );
};

export default ResetPassword;
