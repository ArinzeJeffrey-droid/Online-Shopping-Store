import React from 'react';
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = "pk_test_51HJH70DmuybhuklTUONWllummUHtby22k5UEJH6F8MMqO0AcW4399m0MTNUjEkfh4T1b47b5LbLD2gdjeOojRYPc00HdiHNXgQ"
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert("Payment Successfull")
        }).catch(err => {
            console.log("Payment error: ", JSON.parse(err))
            alert("There was an issue with your payment. Please make sure you use the provided credit card")
        })
    }
    return (
        <StripeCheckout
            label="Pay Now"
            name="Online Store"
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;