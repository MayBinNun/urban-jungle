import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import PlantItem from "../../funcComponents/Cards/PlantItem";
import classes from './PlantMenu.module.css';

import {cards} from "../../../data/data-export";

class PlantMenu extends Component{

    state = {
        cards: [
            {
                id: 1,
                url: '',
                price: 10,
                name:'succulent',
                description:'lots of sun, lots of love'
            },
        ]
    };

    componentDidMount = async () => {
    this.getTickets();
        };

    getTickets() {
        this.setState({cards: cards});
    }

    render() {
        /*const items = [];
        var i = 0;
        for (const card of  this.state.cards){

        }*/

        return (

            <Container className='pb-4' style={{background: 'dark'}}>
                <div className={classes.PlantItemList}>
                {this.state.cards?.map(item => <PlantItem item={item}/>)}
            </div>
                </Container>
        )
    }

}

export default PlantMenu;