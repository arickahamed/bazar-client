import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../style/LoginRegister.css";

const RegisterPage = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [answer, setAnswer] = useState();
    const [role, setRole] = useState();
    const navigate = useNavigate();
    const handleSignUp = async () => {
        console.log(process.env.REACT_APP_API);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/app/v1/auth/register`,
                { name, email, password, phone, address, answer, role }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    // console.log(process.env.REACT_APP_API);
    return (
        <Layout title="Register-Bazar">
            <div className="login-register">
                <div className="login-register-card">
                    <h3>SignUp</h3>
                    <div className="role">
                        <h5>Select Your Role :</h5>
                        <div className="role-card">
                            <div className="role-card-input">
                            <input
                                type="radio"
                                id="role-user"
                                value="user"
                                name="role"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            {/* <label htmlFor="role-user">User</label> */}
                            <h6>User</h6>
                            </div>
                            <div className="role-card-input">
                            <input
                                type="radio"
                                id="role-admin"
                                value="admin"
                                name="role"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            {/* <label htmlFor="role-admin">Admin</label> */}
                            <h6>Admin</h6>
                            </div>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Your Favorite Game"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                    <button onClick={() => handleSignUp()}>Sign Up</button>

                    <hr />
                    <h6>
                        Don't have an account ?{" "}
                        <Link className="login-register-link" to="/login">
                            {" "}
                            Login
                        </Link>
                    </h6>
                </div>
            </div>
        </Layout>
    );
};

export default RegisterPage;
