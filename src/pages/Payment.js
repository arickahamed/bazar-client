import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import CheckoutForm from "../components/form/CheckoutForm";
import "../style/Payment.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
    const cart = useSelector((state) => state.cart);
    return (
        <Layout>
            <div className="payment">
            <h2>Payment Page</h2>
            <h5>Please pay <strong>${cart.totalPrice}</strong></h5>
            <hr />
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
            </div>
        </Layout>
    );
};

export default Payment;
