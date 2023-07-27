import React from "react";
import { GrFormAdd } from "react-icons/gr";
import { IoIosRemove } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { addProduct, removeProduct } from "../redux/reducer/cartSlice";
import "../style/CartPage.css";

const CartPage = () => {
    const user = useSelector((state) => state.auth?.user?.name);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAddProduct = (product) => {
        dispatch(addProduct(product));
    };
    const handleRemoveProduct = (product) => {
        dispatch(removeProduct(product));
    }
    const handleProceedToPayment = () => {
        if(user) {
            navigate("/payment");
        }else{
            navigate("/login");
        }
    }
    return (
        <Layout title="Your Cart- Bazar">
            <div className="cart">
                <h2>{user ? `${user}'s Cart` : `Your Cart`}</h2>
                <hr />
                <div className="cart-card">
                    {cart?.cartItems?.length !== 0 ? (
                        cart?.cartItems?.map((product) => (
                            <div className="cart-element" key={product._id}>
                                <img
                                    src={`${process.env.REACT_APP_API}/app/v1/product/product-photo/${product._id}`}
                                    alt={product._id}
                                />
                                <div className="cart-price-quantity">
                                    <h6>Price: {product.price}</h6>
                                    <h6>Quantity: {product.quantity}</h6>

                                    <h4>{product.price * product.quantity}</h4>
                                </div>
                                <div className="cart-add-remove-btn">
                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            handleAddProduct(product)
                                        }
                                    >
                                        <GrFormAdd />
                                    </button>
                                    <button className="btn btn-outline-success" onClick={()=> handleRemoveProduct(product)}>
                                        <IoIosRemove />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{textAlign: "center"}}>
                            <h3>Your cart is empty</h3>
                        </div>
                    )}
                </div>
                <div className={cart?.cartItems?.length>0 ? "sub-total" : ""}>
                    {cart?.cartItems?.length>0 ? (
                        <>
                        <h2>Subtotal</h2>
                        <h3>Total Price : {cart.totalPrice} </h3>
                        <button className="btn btn-success cart-payment-btn" onClick={handleProceedToPayment}>Proceed to payment</button>
                        </>
                    ) : (
                        <>
                            {null}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
