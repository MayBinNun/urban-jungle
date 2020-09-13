import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";


class PlaceOrder extends Component {
    state = {
        expYear: '',
        expMonth: '',
        cardName: '',
        cardNum: '',
        cvv: ''
    };


    validateForm() {
        //return !(this.state.expYear.length > 0 && this.state.expMonth.length > 0 && this.state.cardName.length > 0 && this.state.cardNum.length > 0 && this.state.cvv.length > 0);
        return true;
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleNewOrder = async (event) => {

        console.log("Not yes implemented");
    };


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

        const placeOrderDiv = <Row>
            <Col xs={12} lg={8}>
                <h4 className='text-uppercase mr-2 my-auto' style={{'padding-top': '60px'}} color='green'>My
                    Details</h4>

                <Card className='mt-3'>
                    <Card.Header>EMAIL ADDRESS</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {this.props.user.email}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='mt-3'>
                    <Card.Header>DELIVERY ADDRESS</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {/*  {this.props.firstName} {this.props.lastName}*/}
                        </Card.Text>
                        <Card.Text>
                            {/*{this.props.address}*/}
                        </Card.Text>
                        <Card.Text>
                            {/*{this.props.city}*/}
                        </Card.Text>
                        <Card.Text>
                            {/*{this.props.country}*/}
                        </Card.Text>
                        <Card.Text>
                            {/*{this.props.zip}*/}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className='mt-3'>
                    <Card.Header>PAYMENT</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            BILLING ADDRESS
                        </Card.Title>
                        <Card.Text>
                            {/*  {this.props.firstName} {this.props.lastName}*/}
                        </Card.Text>
                        <Card.Text>
                            {/*{this.props.address}*/}
                        </Card.Text>
                        <Card.Text>
                            {/*{this.props.city}*/}
                        </Card.Text>
                        <Card.Text>
                            {/*{this.props.country}*/}
                        </Card.Text>
                        <Card.Text>
                            {/*{this.props.zip}*/}
                        </Card.Text>

                        <hr/>

                        <Card.Title>
                            PAYMENT TYPE
                        </Card.Title>
                        <Form className='my-4'>
                            <Form.Group controlId="cardNum">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control onChange={this.handleChange} type='number' placeholder="Card Number"
                                              required/>
                            </Form.Group>

                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Row>
                                <Form.Group controlId="expMonth">
                                    <Form.Control onChange={this.handleChange} as="select" required>
                                        <option disabled selected>Choose...</option>
                                        {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(num => {
                                            return <option>{num}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="expYear">
                                    <Form.Control onChange={this.handleChange} as="select" required>
                                        <option disabled selected>Choose...</option>
                                        {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(num => {
                                            return <option>{num}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="cardName">
                                <Form.Label>Name On Card</Form.Label>
                                <Form.Control onChange={this.handleChange} placeholder="Name On Card" required/>
                            </Form.Group>

                            <Form.Group controlId="cvv">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control onChange={this.handleChange} type='number' placeholder="CVV" required/>
                            </Form.Group>

                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>;

        return (
            <>{this.props.isLoggedIn ? placeOrderDiv : needToLogin}</>);
    }

}


export default PlaceOrder;