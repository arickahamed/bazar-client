import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { addProduct } from "../redux/reducer/cartSlice";
import "../style/CartPage.css";
import "../style/Search.css";


const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const search = useSelector((state) => state?.search);

    const handleAddProduct = (product) => {
        dispatch(addProduct(product));
        toast.success(`${product.name} added to cart`);
    };

    // handle back button
    const handleBack = () => {
        navigate("/");
    };

    return (
        <Layout>
            <div className="search">
                <h2>
                    {search
                        && `${search.result?.length} products found`
                    }
                </h2>
                <hr />
                <div className="search-product">
                    {search?.result?.length > 0 ? (
                        search?.result?.map((product) => (
                            // console.log(product, "Hello Show Search Page");
                            <div
                                className="product-details-card"
                                key={product._id}
                            >
                                <img
                                    src={`${process.env.REACT_APP_API}/app/v1/product/product-photo/${product._id}`}
                                    alt={product._id}
                                    height={"200px"}
                                    className="img img-responsive"
                                />
                                <h4>{product.name}</h4>
                                <h6>{product.description}</h6>
                                <h4>price: {product.price}</h4>
                                <h5>Quantity: {product.quantity}</h5>
                                <div className="product-details-button">
                                    <button
                                        className="btn btn-outline-success"
                                        onClick={handleBack}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            handleAddProduct(product)
                                        }
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <h2>Please go back to home.</h2>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Search;
