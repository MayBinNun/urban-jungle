import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import PlantItem from "../../funcComponents/Cards/PlantItem";
import classes from './PlantMenu.module.css';
import {getTicketsInfo} from "../../../api";
import {cards} from "../../../data/data-export";

class PlantMenu extends Component {

    state = {
        cards: []
    };

    async componentDidMount() {
       /*  try{
             const res = await getTicketsInfo();
             const data = res.data;
             this.setState({cards: data});
             console.log(this.state.cards);
        }catch (e) {
            this.setState({cards:[]});
            alert(e);
        }*/
       this.getTickets();
    }


        getTickets() {
            this.setState({cards: cards});
        }


    render() {
        /*const items = [];
        var i = 0;
        for (const card of  this.state.cards){

        }*/


        const items = [...this.state.cards];

        return (
            <Container  style={{background: 'dark'}}>
                <div className={classes.PlantItemList}>
                    {items.map((item) => <PlantItem item={item} isLoggedIn={this.props.isLoggedIn} addToCart={this.props.addToCart}/>)}
                </div>
            </Container>
        )
    }

}

export default PlantMenu;