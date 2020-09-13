import React, {Component} from 'react';
import classes from "./Checkout.module.css";
import {Link} from "react-router-dom";
import CartSomeUp from "../../funcComponents/Cart/CartSomeUp";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CartTotal from "../../funcComponents/Cart/CartTotal";
import Form from "react-bootstrap/Form";


class Checkout extends Component {


    render() {

        const needToLogin =
            <div className='text-center' style={{'margin-top': '60px'}}>
                <h2>
                    You must Login or Signup to checkout
                </h2>
                <Link to='login'>
                    <Button variant='info' className='mt-4'>
                        To Login/Signup
                    </Button>
                </Link>
            </div>;

        const checkoutDiv = <div className={classes.Checkout}>
            <CartTotal selectedProducts={this.props.selectedProducts} totalPrice={this.props.totalPrice}/>
            <CartSomeUp handleNewOrder={this.handleNewOrder} disabled={this.validateForm}
                        totalPrice={this.props.totalPrice}/>
        </div>;

        const emptyCard =
            <div className='text-center' style={{'margin-top': '60px'}}>
                <h2>
                    Oh oh! You card is still empty..
                </h2>
                <Link to='/Menu'>
                    <Button variant='info' className='mt-4'>
                        Want to see what we got?
                    </Button>
                </Link>
            </div>;

        return (
            <>
                {this.props.isLoggedIn ? (this.props.selectedProducts.length==0 ? emptyCard : checkoutDiv) : (needToLogin)}</>
        );
    }
}


export default Checkout;