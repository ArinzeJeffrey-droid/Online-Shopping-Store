import React from 'react';
import { connect } from "react-redux"
import {createStructuredSelector} from "reselect"
import { selectCartItems} from "../../redux/cart/cart.selectors"

import CustomButton from "../button/custom-button.component"
import CartItem from "../cart-item/cart-item.component"

import "./cart-dropdown.styles.scss"

const CartDropDown = ({ cartItems }) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ?
                        (
                        cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem}/>
                        ))
                        )
                    :
                    (<span className="empty-message">Your Cart IS Empty</span>)
                }
            </div>
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})


export default connect(mapStateToProps)(CartDropDown)