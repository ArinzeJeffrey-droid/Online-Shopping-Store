import React from 'react';
import {Link} from "react-router-dom"
import {ReactComponent as Logo} from "../../assets/crown.svg"
import "./header.styles.scss"

const Header = () => {
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
            </div>
        </div>
    );
}

export default Header;