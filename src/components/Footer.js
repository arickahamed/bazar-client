import React from "react";
import { FcAbout } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "../style/Footer.css";

const Footer = () => {
    return (
        <div className="bg-dark text-light p-3 footer">
            <div className="bottom-nav">
                <NavLink to="/about" className="nav-link">
                    <FcAbout />
                </NavLink>

                <NavLink to="/contact" className="nav-link ">
                    <HiOutlineMail />
                </NavLink>

                <NavLink to="/policy" className="nav-link" aria-current="page">
                    <MdOutlinePrivacyTip />
                </NavLink>
            </div>
            <footer className="text-center">
                All Right Reserved &copy;{" "}
                <a
                    style={{ textDecoration: "none" }}
                    href="https://www.fiverr.com/arick_ahamed/html-fixer-css-fixer-javascript-error-solve-code-fix"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Arick Ahamed
                </a>
            </footer>
        </div>
    );
};

export default Footer;
