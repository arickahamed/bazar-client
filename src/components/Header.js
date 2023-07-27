import React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { RiLoginCircleLine } from "react-icons/ri";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { addProfile } from "../redux/reducer/authSlice";
import "../style/Header.css";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth);
    const cartProduct = useSelector(state => state.cart.cartItems.length);
    const userName = useSelector(state => state.auth?.user?.name);
    const handleLogout = () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("totalPrice");
        toast.success("logged out successfully");
        dispatch(addProfile(user.user = null, user.token = ""))
    }

    const handleDashboardBtn = () => {
        navigate(user.user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    }

    return (
        <>
            <nav className=" navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="logo-user">
                        <Link
                            style={{ fontWeight: "600" }}
                            to="/"
                            className="navbar-brand"
                        >
                            <TfiShoppingCartFull /> Bazar
                        </Link>
                            
                        {userName && 
                        <button className="dashboard-btn btn btn-primary" onClick={handleDashboardBtn}>
                        <h5 className={`${userName.length > 3 ? "userName_nav2": "userName_nav"}`}>{userName}</h5> 
                        </button>
                        }
                    </div>
                    <div className="navbar-item">
                        <NavLink to="/cart" className="nav-link">
                            <AiOutlineShoppingCart />
                            <h5 className="cart-product-number">{cartProduct > 0 ? cartProduct : null}</h5>
                        </NavLink>
                        {
                            userName ? (
                                <NavLink to="/login" className="nav-link" onClick={handleLogout}>
                            <RiLoginCircleLine />
                        </NavLink>
                            ): (
                                <NavLink to="/login" className="nav-link">
                                    <BiUserCircle />
                        </NavLink>
                            )
                        }
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;

