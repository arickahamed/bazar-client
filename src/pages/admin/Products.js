import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import AdminNav from "../../components/dashboardNav/AdminNav";
import "../../style/Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    // console.log(products);

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/app/v1/product/get-products`
            );
            if (data?.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout>
            <AdminNav />
            <div className="admin-product-list">
                <h3>All Products List</h3>
                {products.length !== 0 ? (
                    <div className="product-card-container">
                        {products.map((p) => (
                            <Link
                                key={p._id}
                                to={`/admin-dashboard/product/${p.slug}`}
                                className="product-link"
                            >
                                <div className="product-card">
                                    <img
                                        src={`${process.env.REACT_APP_API}/app/v1/product/product-photo/${p._id}`}
                                        alt={p._id}
                                    />
                                    <h3>{p.name}</h3>
                                    <p>{p.description}</p>
                                    <h6>Price: {p.price}</h6>
                                    <h6>Quantity: {p.quantity}</h6>
                                    <p>Shipping: {p.shipping}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div
                        style={{
                            minHeight: "40vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "rgb(104, 223, 157)",
                        }}
                    >
                        <h5>You don't have products</h5>
                        <h2>Please add some product to sell</h2>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Products;
