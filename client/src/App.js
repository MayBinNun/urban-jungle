import React, {Component} from 'react';
import Login from './components/Pages/Login/Login'
import {Route, Switch} from 'react-router-dom';
import Toolbar from "./components/Pages/Toolbar/Toolbar";
import PlantMenu from "./components/Pages/PlantMenu/PlantMenu";
import Signup from "./components/Pages/Signup/Signup";
import Home from  "./components/funcComponents/Home/Home";
import Admin from "./components/Pages/Admin/Admin";
import Checkout from "./components/Pages/Checkout/Checkout";
import backround from "./assets/backround.jpg";


export default class App extends Component {

    state = {
        isLoggedIn: false,
        isAdmin: false,
        selectedProducts:[]
    };

    setLoggedin = (isAdmin) => {
        this.setState({isLoggedIn : true});
        if (isAdmin) {
            this.setState({isAdmin : true});
        }
    };

    setLoggedOut = () => {
        this.setState({isLoggedIn : false})
    };

    render() {
        return (
            <div style={{ padding:40, backgroundImage:`url(${backround})`, minWidth: "100%", minHeight: '1000px', backgroundSize: 'cover', backgroundPosition:'center'}}>
                <Toolbar isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} setLogOut={this.setLogOut} />
                <Switch>
                    <Route path={"/Login"} render={() => <Login setLoggedin={this.setLoggedin} />} />
                    <Route path={"/Menu"} component={PlantMenu}/>
                    <Route path={"/Signup"} component={Signup}/>
                    <Route path={"/Admin"} component={Admin}/>
                    <Route path={"/Checkout"} component={Checkout}/>
                </Switch>
            </div>
        );
    }


}

