import React from 'react';

import CartSomeUpRow from "./CartSomeUpRow";


const CartTotalsCheckout = (props) => {
    return (
        <div className="container">
            <h2>Let's see what we got..</h2>
            <table className="table table-borderless table-light table-bordered rounded">
                <thead className="thead-light rounded ">
                <tr className='text-center'>
                    <th>image</th>
                    <th>Product</th>
                    <th>Unit Price</th>
                </tr>
                </thead>
                <tbody>
                {props.selectedProducts.map(item => <CartSomeUpRow item={item}/>)}
                <tr className='text-center'>
                    <th></th>
                    <th></th>
                    <th>Total Price: {props.totalPrice} $</th>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CartTotalsCheckout;