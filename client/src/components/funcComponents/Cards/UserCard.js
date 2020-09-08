import React from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Classes from "./UserData.module.css";

const userData = ({item}) => (

    <div className={Classes.UserData}>
    <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{item.firstName} {item.lastName}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{item.address}</li>
                <li className="list-group-item">{item.city}</li>
                <li className="list-group-item">{item.country}</li>
            </ul>
    </div>
    </div>

);

export default userData;