import React, {Component} from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Classes from "./PlantItem.module.css";

class plantItem extends Component{


    handleAddToCard = () => {
        debugger
        this.props.addToCart(this.props.item);
    }

    render() {
        return(  <div key={this.props.item.id} className="card" style={{width: '18rem'}}>
            <img className="card-img-top" src={this.props.item.url} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{this.props.item.name}</h5>
                <p className="card-text">{this.props.item.description}</p>
                <button onClick={this.handleAddToCard} className="btn btn-primary">Add to cart</button>
            </div>
        </div>);
    }
}







export default plantItem;