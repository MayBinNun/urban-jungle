import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import {contactUS} from "../../../api";
import React, { Component } from 'react';


class ContactUS extends React.Component {

    state = {
            name: '',
            email: '',
            message: ''
    };

    validateForm() {
        //return !(this.state.expYear.length > 0 && this.state.expMonth.length > 0 && this.state.cardName.length > 0 && this.state.cardNum.length > 0 && this.state.cvv.length > 0);
        return true;
    }

    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onMessageChange(event) {
        this.setState({message: event.target.value})
    }



    handleSubmit = async (event) => {
        event.preventDefault();
         let res = await contactUS(this.state);

    };

    render() {
        return(
            <div className="contact">
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default ContactUS;