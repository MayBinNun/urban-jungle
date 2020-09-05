import React from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Classes from "./PlantItem.module.css";

const plantItem = ({item}) => (

    <div key={item.id} className="card" style={{width: '18rem'}}>
        <img className="card-img-top" src={item.url} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <a href={""} className="btn btn-primary">Add to cart</a>
            </div>
    </div>

);

export default plantItem;