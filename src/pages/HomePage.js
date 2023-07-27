import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SearchInput from "../components/form/SearchInput";
import Loader from "../components/loader/Loader";
import { addAllProducts, addProduct } from "../redux/reducer/cartSlice";
import "../style/Home.css";
import "../style/Products.css";

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    // get products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/app/v1/product/get-products`
            );
            if (data.success) {
                setProducts(data.products);
                dispatch(addAllProducts(data.products));
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // handle add to cart
    const handleAddToCart = async (product) => {
        toast.success(`${product.name} added to cart`);
        dispatch(addProduct(product));
    };

    return (
        <Layout title="Bazar-Your Shop">
            {console.log(process.env.REACT_APP_API)};
            <div className="home-page">
                <div className="filters">
                    <SearchInput />
                </div>
                <div className="home-page-products">
                    {products.length !== 0 ? (
                        products.map((p) => (
                            <div className="product-card" key={p._id}>
                                <Link
                                    to={`/product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div>
                                        <img
                                            src={`${process.env.REACT_APP_API}/app/v1/product/product-photo/${p._id}`}
                                            alt={p._id}
                                        />
                                        <h3>{p.name}</h3>
                                        <h6>Price: {p.price}</h6>
                                    </div>
                                </Link>
                                <div
                                    className="btn btn-success add-cart-button"
                                    onClick={() => handleAddToCart(p)}
                                >
                                    Add to cart
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="home-loader">
                            <Loader />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
