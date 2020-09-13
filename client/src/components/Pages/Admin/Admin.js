import React, { Component } from 'react';
import { getAdminData } from "../../../api";
import classes from "./Admin.module.css";
import UserData from '../../funcComponents/Cards/UserData';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

class Admin extends Component {
    state = {
        cards: []
    };

    async componentDidMount() {
        if (this.props.isAdmin && this.props.isLoggedIn) {
            try {
                const res = (await getAdminData("Admin", true));
                console.log(res.data);
                this.setState({cards: res.data});
            } catch (e) {
                this.setState({cards: []});
                alert(e.message);
            }
        }


    }


    render() {

        const needToLogin =
            <div className='text-center' style={{'margin-top': '60px'}}>
                <h2>
                    You must Login or Signup to see this info
                </h2>
                <Link to='login'>
                    <Button variant='info' className='mt-4'>
                        To Login/Signup
                    </Button>
                </Link>
            </div>;

        const youAreNoAdmin =   <div className='text-center' style={{'margin-top': '60px'}}>
            <h2>
                Hi Sneaky, you are not an admin!
            </h2>
            <Link to='login'>
                <Button variant='info' className='mt-4'>
                    To Login/Signup
                </Button>
            </Link>
        </div>;

        const adminData = <div className={classes.Admin}>
            <div>
                {this.state.cards.map((item) => <UserData item={item}/>)}
            </div>
        </div>

        return (
            <>
            { this.props.isAdmin && this.props.isLoggedIn ? adminData
            : (!this.props.isAdmin && this.props.isLoggedIn ? youAreNoAdmin : needToLogin)}
                </>
        )
    }
}

export default Admin;

