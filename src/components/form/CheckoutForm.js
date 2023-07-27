import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../style/CheckoutForm.css";

const CheckoutForm = () => {
    
    const navigate = useNavigate();
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    console.log(JSON.stringify(totalPrice));
    const token = useSelector((state) => state.auth.token);
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    console.log(clientSecret);
    const stripe = useStripe();
    const elements = useElements();
    const localToken = JSON.parse(localStorage.getItem("auth")).token;
    useEffect(()=> {
        const response = axios({
            url: `${process.env.REACT_APP_API}/app/v1/payment/checkout`,
            method: "post",
            data: {
                amount: totalPrice,
                token: localToken
            }
        });
        if(response === 200) {
            console.log("successfully payment done");
            setClientSecret(clientSecret);
        }
    }, [totalPrice]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });
        if (error) {
            console.log("[error]", error);
            setCardError(error.message);
        } else {
            console.log("[PaymentMethod]", paymentMethod);
            setClientSecret()
            setCardError("");
            navigate("/");
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button
                type="submit"
                className="pay-button btn btn-success"
                disabled={!stripe || !clientSecret}
            >
                Let's Pay
            </button>
        </form>
        <p className="text-danger">{cardError}</p>
        </>
    );
};

export default CheckoutForm;
