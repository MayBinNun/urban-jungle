import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAdminData } from "../../../api";
import { Container } from "react-bootstrap";
import classes from "../PlantMenu/PlantMenu.module.css";
import UserData from '../../funcComponents/Cards/UserCard';
import PlantItem from "../../funcComponents/Cards/PlantItem";

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

            const json = (await getAdminData("", true)).data;
            this.setState({cards: json});

    }

    render() {
        /*const items = [];
        var i = 0;
        for (const card of  this.state.cards){

        }*/

        return (

            <Container className='pb-4' style={{background: 'dark'}}>
                <div>
                    {this.state.cards?.map(item => <UserData item={item}/>)}
                </div>
            </Container>
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