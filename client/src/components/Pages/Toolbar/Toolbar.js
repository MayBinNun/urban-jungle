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

    state = {
        numOfItems: 0,
    };

    render(){
        return(
        <header className={classes.Toolbar}>
            <ul className={classes.NavList}>
                <NavItem link ="/" >Home</NavItem>
                <NavItem link ="/Menu" >Shop Plants</NavItem>
                <NavItem link ="/" >Contact Us</NavItem>
            </ul>
            <ul className={classes.NavList}>
            <NavItem link ="/Login" >Login/Logout</NavItem>
            <NavItem link ="/Admin" >Admin</NavItem>
            <ShoppingCartBadge link="/Checkout" numOfItems='0'/>
            </ul>
        </header>);
    }



}

export default Toolbar;