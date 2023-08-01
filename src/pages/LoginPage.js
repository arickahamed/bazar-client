import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../style/LoginRegister.css";

const LoginPage = () => {
    const location = useLocation();
    // console.log(location.state?.from?.pathname);
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    console.log(`${process.env.REACT_APP_API}/app/v1/auth/login`);
    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/app/v1/auth/login`,
                { email, password }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(from, {replace: true});
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
                    <h3>Login</h3>
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button onClick={handleLogin}>Login</button>
                    <hr />
                    <h6>
                        Don't have an account ?{" "}
                        <Link className="login-register-link" to="/register">
                            Sign Up
                        </Link>
                    </h6>
                    <h6>
                        <Link className="login-register-link" to="/forget-password">
                            Forget Password !
                        </Link>
                    </h6>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;
