import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Layout from "../../components/Layout";
import AdminNav from "../../components/dashboardNav/AdminNav";
import CategoryForm from "../../components/form/CategoryForm";
import Loader from "../../components/loader/Loader";
import "../../style/CreateCategory.css";

const CreateCategory = () => {
    const [categories, setCategories] = useState();
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    // console.log(categories);

    // handle form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/app/v1/category/create-category`,
                { name }
            );
            // console.log(data);
            if (data?.success) {
                toast.success(data.message);
                // console.log(name);
                setName("");
                getAllCategory();
            } else {
                toast.error("You Find It");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

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


    // update category
    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/app/v1/category/update-category/${selected._id}`, {name: updatedName});
            if(data.success) {
                toast.success(`${name} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    // delete category
    const handleDelete = async(id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/app/v1/category/delete-category/${id}`);
            if(data.success) {
                toast.success(data.message);
                getAllCategory();
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <AdminNav />
            <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
            />

            {categories ? (
                categories != "" ? (
                    <div className="category-table">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {categories?.map((category) => (
                                    <tr className="table-row td">
                                        <td key={category._id} className="td-name">
                                            {category.name}
                                        </td>
                                        <td>
                                        <button
                                                className=" btn btn-primary ms-2"
                                                onClick={() => {setVisible(true); setUpdatedName(category.name);
                                                setSelected(category)}}
                                            >
                                                <AiOutlineEdit />
                                            </button>
                                        <button
                                                className="td td-edit btn btn-danger ms-2"
                                                onClick={()=> handleDelete(category._id)}
                                            >
                                                <AiOutlineDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}
                        >
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                ) : (
                    <div className="empty-category">
                        <h5>Category is empty!</h5>
                        <h3>Please Add Some Categories.</h3>
                    </div>
                )
            ) : (
                <div className="create-category-loader">
                    <Loader />
                </div>
            )}

        </Layout>
    );
};

export default CreateCategory;
