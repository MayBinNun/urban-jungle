import React from 'react';
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";



const cartSomeUp = (props) => {


    return (
        <div>
            <h4 className='text-uppercase my-auto' style={{width: '13rem'}}>Cart Totals</h4>
            <Card className='mt-3'>
                <Card.Header className='pl-2 font-weight-bold'>
                    {/* {props.total}*/} Products
                </Card.Header>
                <Card.Body className='d-flex justify-content-between p-2 mt-3'>
                    <Card.Text>
                        Products Price
                    </Card.Text>
                    <Card.Text>
                        {props.totalPrice} $
                    </Card.Text>
                </Card.Body>

                <Card.Body className='d-flex justify-content-between p-2'>
                    <Card.Text>
                        Delivery
                    </Card.Text>
                    <Card.Text>
                        {3.50} $
                    </Card.Text>
                </Card.Body>

                <Card.Body className='d-flex justify-content-between p-2'>
                    <Card.Text>
                        Total
                    </Card.Text>
                    <Card.Text>
                        ${props.totalPrice + 3.50}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link to={'/PlaceOrder'}>
                    <Button onClick={props.handleNewOrder} variant='info' block disabled={props.disabled}>Checkout
                    </Button>
                    </Link>
                </Card.Footer>
            </Card>

        </div>);


}


export default cartSomeUp;
