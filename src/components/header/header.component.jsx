import React from 'react';
import { connect } from "react-redux"
import {createStructuredSelector} from "reselect"
import {Link} from "react-router-dom"
import { auth } from "../../firebase/firebase.util"
import {ReactComponent as Logo} from "../../assets/crown.svg"
import "./header.styles.scss"
import CartIcon from '../cart-icon/cart-icon.component';
import { selectCartHidden} from "../../redux/cart/cart.selectors"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => {
    return (  
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                <Link to="/shop" className="option">
                    SHOP
                </Link>
                <Link to="/shop" className="option">
                    CONTACT
                </Link>
                {
                    currentUser ?
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className="option" to="/signin">
                        SIGN IN
                    </Link>
                }
                <CartIcon/>
            </div>
            {
                hidden ? null : <CartDropDown/>
            }
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);