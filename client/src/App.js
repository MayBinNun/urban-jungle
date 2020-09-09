import React, {Component} from 'react';
import Login from './components/Pages/Login/Login'
import {Route, Switch} from 'react-router-dom';
import Toolbar from "./components/Pages/Toolbar/Toolbar";
import PlantMenu from "./components/Pages/PlantMenu/PlantMenu";
import Signup from "./components/Pages/Signup/Signup";
import Admin from "./components/Pages/Admin/Admin";
import backround from "./assets/backround.jpg";
import Checkout from "./components/Pages/Checkout/Checkout";
import ContactUS from "./components/Pages/ContactUS/ContactUS";


export default class App extends Component {

    state = {
        isLoggedIn: false,
        isAdmin: true,
        selectedProducts: []
    };

    setLoggedin = (isAdmin) => {
        this.setState({isLoggedIn: true});
        if (isAdmin) {
            this.setState({isAdmin: true});
        }
    };

    setLoggedOut = () => {
        this.setState({isLoggedIn: false})
    };

    addToCart = (card) => {
        this.setState({selectedProducts: [...this.state.selectedProducts, card]});
        console.log(this.state.selectedProducts)

    }

    render() {
        return (
            <div style={{
                padding: 40,
                backgroundImage: `url(${backround})`,
                minWidth: "100%",
                minHeight: '1000px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <Toolbar isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} setLogOut={this.setLogOut}/>
                <Switch>
                    <Route path={"/Login"} render={() => <Login setLoggedin={this.setLoggedin}/>}/>
                    <Route path={"/Menu"} render={() => <PlantMenu addToCart={this.addToCart}/>}/>
                    <Route path={"/Signup"} component={Signup}/>
                    <Route path={"/Admin"} component={Admin}/>
{/*
                    <Route path={"/ContactUS"} component={ContactUS}/>
*/}
                    <Route path={"/Checkout"} render={() => <Checkout setLoggedin={this.setLoggedin}
                                                                      selectedProducts={this.state.selectedProducts}/>}/>
                </Switch>
            </div>
        );
    }


}

