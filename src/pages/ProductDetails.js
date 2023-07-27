import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { addProduct } from "../redux/reducer/cartSlice";
import "../style/ProductDetails.css";

const ProductDetails = () => {
    const [category, setCategory] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");
    const [product, setProduct] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    // get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/app/v1/product/get-product/${params.slug}`
            );
            setProduct(data.product);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category);
            setId(data.product._id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    const handleAddProduct = (product) => {
        dispatch(addProduct(product));
        toast.success(`${product.name} added to cart`);

    };

    // handle back button 
    const handleBack = () => {
        navigate("/");
    }
    return (
        <Layout>
            <div className="product-details">
                <h3>{`Know more about ${name}`}</h3>
                <div className="product-details-card">
                    <img
                        src={`${process.env.REACT_APP_API}/app/v1/product/product-photo/${id}`}
                        alt={id}
                        height={"200px"}
                        className="img img-responsive"
                    />
                    <h6>Category: {category.name}</h6>
                    <h4>{name}</h4>
                    <h6>{description}</h6>
                    <h4>price: {price}</h4>
                    <h5>Quantity: {quantity}</h5>
                    <div className="product-details-button">
                        <button className="btn btn-outline-success" onClick={handleBack}>Back</button>
                        <button className="btn btn-success" onClick={()=>handleAddProduct(product)}>Add to cart</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
