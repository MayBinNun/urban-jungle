import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CartSomeUpRow = (props) => {
    return (
        <tr className='text-center'>
            <td className='align-middle'>
                <img
                    style={{height: 110, width: 110}}
                    src={props.item.url}
                />
            </td>
            <td className='align-middle'>{props.item.name}</td>
            <td className='align-middle'>{props.item.price} $</td>
        </tr>)
};


export default CartSomeUpRow;