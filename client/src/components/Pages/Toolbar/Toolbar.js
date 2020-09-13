import React, {Component} from "react";
import classes from './Toolbar.module.css';
import NavItem from '../../funcComponents/NavItem/NavItem';
import ShoppingCartBadge from '../../funcComponents/NavItem/ShoppingCartBadge';
import Checkout from "../Checkout/Checkout";

import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import {FaShoppingCart} from "react-icons/fa";

class Toolbar extends Component {


    render() {
        return (
            <header className={classes.Toolbar}>
                <ul className={classes.NavList}>
                    <NavItem link="/">Home</NavItem>
                    <NavItem link="/readme">Read Me</NavItem>
                    {this.props.isLoggedIn &&<NavItem link="/Menu">Shop Plants</NavItem>}
                    {this.props.isLoggedIn && <NavItem link="/ContactUS">Contact Us</NavItem>}
                </ul>
                <ul className={classes.NavList}>
                    <NavItem link="/Login">Login/SignUp</NavItem>
                    {this.props.isAdmin && <NavItem link="/Admin">Admin</NavItem>}
                    {this.props.isLoggedIn &&
                    <ShoppingCartBadge link="/Checkout" selectedProducts={this.props.selectedProducts}
                                       totalProducts={this.props.totalProducts}/>}
                </ul>
            </header>);
    }


}

export default Toolbar;