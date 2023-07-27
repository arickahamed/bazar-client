import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../style/LoginRegister.css";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [answer, setAnswer] = useState();
    const handleCheck = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/app/v1/auth/forget-password`,
                { email, answer }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/reset-password");                
            } else {
                toast.error(res.data.message);
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
                    <h3>Forget Password</h3>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Your Favorite Game"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                    <button onClick={handleCheck}>Check</button>
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

export default ForgetPassword;
