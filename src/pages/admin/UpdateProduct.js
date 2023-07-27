import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import AdminNav from "../../components/dashboardNav/AdminNav";
import "../../style/CreateProduct.css";
import "../../style/UpdateProduct.css";

const { Option } = Select;

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState('');

    const navigate = useNavigate();
    const params = useParams();

    // get single product
    const getSingleProduct = async() => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/app/v1/product/get-product/${params.slug}`);
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
            setId(data.product._id);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, [])

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/app/v1/category/get-category`
            );
            if (data?.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    // update product function
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/app/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.success("Product Updated Successfully");
                navigate("/admin-dashboard/products");
            } else {
                toast.error(data?.error);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // delete product
    const handleDeleteProduct = async() => {
        try {
            let answer = window.prompt("Are you sure wanna delete ?");
            if (!answer) return;
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/app/v1/product/delete-product/${id}`);
            if(data.success) {
                toast.success(data.message);
                navigate("/admin-dashboard/products")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <AdminNav />
            <div className="create-product">
                <h3>Update Product</h3>
                <form>
                    <div className="m-1 w-75">
                        <Select
                            bordered={false}
                            placeholder="Select a category"
                            size="Large"
                            showSearch
                            className="form-select mb-3 select-input"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            value={category}
                        >
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
                        <div className="mb-3">
                            <label className="btn btn-outline-success">
                                {photo ? photo.name : "Upload Photo"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="images/*"
                                    onChange={(e) =>
                                        setPhoto(e.target.files[0])
                                    }
                                    hidden
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            {photo ? (
                                <div className="text-center product-img-show">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="product"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div> 
                            ) : (
                                <div className="text-center product-img-show">
                                    <img
                                        src={`${process.env.REACT_APP_API}/app/v1/product/product-photo/${id}`} alt={id} 
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div> 
                            )}
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={name}
                                placeholder="Write a name"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                rows="4"
                                cols="50"
                                type="text"
                                value={description}
                                placeholder="Write a description"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                value={price}
                                placeholder="Write a price"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                value={quantity}
                                placeholder="Write a quantity"
                                className="form-control"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <Select
                                bordered={false}
                                placeholder="Select shipping"
                                size="Large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setShipping(value);
                                }}
                                value={shipping ? "Yes" : "No"}
                            >
                                <Option value="0">Yes</Option>
                                <Option value="1">No</Option>
                            </Select>
                        </div>
                        <div className="mb-3 update-delete-button">
                            <button
                                className="btn btn-success"
                                type="submit"
                                onClick={handleUpdateProduct}
                            >
                                <GrUpdate />
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={handleDeleteProduct}
                            >
                                <AiTwotoneDelete />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
