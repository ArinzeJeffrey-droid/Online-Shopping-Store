import React from 'react';
import StripeCheckout from "react-stripe-checkout"


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = "pk_test_51HJH70DmuybhuklTUONWllummUHtby22k5UEJH6F8MMqO0AcW4399m0MTNUjEkfh4T1b47b5LbLD2gdjeOojRYPc00HdiHNXgQ"
    const onToken = token => {
        console.log(token)
        alert("Payment Successful")
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