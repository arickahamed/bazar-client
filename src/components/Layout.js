import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import { addProfile } from "../redux/reducer/authSlice";
import "../style/Layout.css";
import Footer from "./Footer";
import Header from "./Header";


const Layout = ({ children, title, description, keywords, author }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            dispatch(addProfile(parseData));
        }
    }, []);
    return (
        <div className="layout">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <div className="header">
                <Header />
            </div>
            <main>
                <Toaster />
                {children}
            </main>
            <div className="layout-footer">
                <Footer />
            </div>
            <ScrollToTop smooth color="rgb(58, 143, 95)"/>
        </div>
    );
};

Layout.defaultProps = {
    title: "Bazar - Your Shop",
    description: "mern stack project",
    keywords: "mern, react, node, mongodb, javascript, ecommerce",
    author: "Arick Ahamed"
}

export default Layout;
