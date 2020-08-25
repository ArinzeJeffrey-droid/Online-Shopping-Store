import React from 'react';
import { connect } from "react-redux"
import {createStructuredSelector} from "reselect"
import { auth } from "../../firebase/firebase.util"
import {ReactComponent as Logo} from "../../assets/crown.svg"
import CartIcon from '../cart-icon/cart-icon.component';
import { selectCartHidden} from "../../redux/cart/cart.selectors"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { HeaderContainer, LogoContainer, OptionsContainer,  OptionLink } from "./header.styles"



const Header = ({ currentUser, hidden }) => {
    return (  
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo"/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop">
                    SHOP
                </OptionLink>
                <OptionLink to="/shop">
                    CONTACT
                </OptionLink>
                {
                    currentUser ?
                    <OptionLink as="div" onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                    :
                    <OptionLink to="/signin">
                        SIGN IN
                    </OptionLink>
                }
                <CartIcon/>
            </OptionsContainer>
            {
                hidden ? null : <CartDropDown/>
            }
        </HeaderContainer>
    );
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);