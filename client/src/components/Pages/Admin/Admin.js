import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAdminData } from "../../../api";
import { Container } from "react-bootstrap";
import classes from "./Admin.module.css";
import UserData from '../../funcComponents/Cards/UserCard';
import PlantItem from "../../funcComponents/Cards/PlantItem";
import {cards} from "../../../data/data-export";

class Admin extends Component {
    state = {
        cards: [{
    firstName: 'firstName',
    lastName: 'lastName',
    address: 'address',
    city: 'city',
    country: 'country',
    houseNum: 'houseNum',
    email: 'email',
    zip: 'zip'
            }]
    };

    async componentDidMount() {
/*        if (this.props.email === 'admin' && this.props.loggedIn) {
            const json = (await getAdminData(this.props.email, this.props.loggedIn)).data;
            this.setState({json: json});
        }*/

            const json = (await getAdminData("Admin", true)).data;
            this.setState({cards: json});
            console.log(cards);

    }

    render() {
        /*const items = [];
        var i = 0;
        for (const card of  this.state.cards){

        }*/

        return (
            <div className={classes.Admin}>
                <div>
                    {this.state.cards?.map(item => <UserData item={item}/>)}
                </div>
            </div>
        )
    }
}

export default Admin;

/*
const mapStateToProps = (state) => {
    return {
        loggedIn: state.user.loggedIn,
        email: state.user.email
    }
};

export default connect(mapStateToProps, null)(Admin)*/
