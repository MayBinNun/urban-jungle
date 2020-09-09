import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAdminData } from "../../../api";
import { Container } from "react-bootstrap";
import classes from "./Admin.module.css";
import UserData from '../../funcComponents/Cards/UserCard';

class Admin extends Component {
    state = {
        cards: []
    };

    async componentDidMount() {
/*        if (this.props.email === 'admin' && this.props.loggedIn) {
            const json = (await getAdminData(this.props.email, this.props.loggedIn)).data;
            this.setState({json: json});
        }*/
            try{
                const res = (await getAdminData("Admin", true));
                this.setState({cards: res.data});
                console.log(this.state.cards);
            } catch (e) {
                this.setState({cards: []});
                alert(e.message);
            }


    }

    render() {
        /*const items = [];
        var i = 0;
        for (const card of  this.state.cards){

        }*/

        return (
            <div></div>

            // <div className={classes.Admin}>
            //     <div>
            //         {this.state.cards?.map(item => <UserData item={item}/>)}
            //     </div>
            // </div>
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
