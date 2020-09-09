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
import {getTicketsInfo} from "../../../api";
//import {cards} from "../../../data/data-export";
import {getAdminData} from "../../../api";

class PlantMenu extends Component {

    state = {
        cards: []
    };

    async componentDidMount() {
        try{
            const json = await getTicketsInfo();
            const data = json.data;
            this.setState({cards: data});
           /* console.log(this.state.cards);*/
        }catch (e) {
            this.setState({cards:[]});
            alert(e);
        }

    }

    /*
        getTickets() {
            this.setState({cards: cards});
        }
    */

    render() {
        /*const items = [];
        var i = 0;
        for (const card of  this.state.cards){

        }*/
        debugger

        const items = [...this.state.cards];
        debugger
        return (
            <Container className='pb-4' style={{background: 'dark'}}>
                <div className={classes.PlantItemList}>
                    {items.map((item) => <PlantItem item={item}/>)}
                </div>
            </Container>
        )
    }

}

export default PlantMenu;