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
import PlaceOrder from "./components/Pages/Checkout/PlaceOrder";
import Home from "./components/funcComponents/Home/Home";
import Readme from "./components/Pages/ReadMe/Readme";


export default class App extends Component {

    state = {
        isLoggedIn: false,
        isAdmin: false,
        selectedProducts: [],
        showSignedUp: false,
        user: {},
        totalProducts: 0,
        totalPrice: 0
    };

    setLoggedin = (isAdmin, user) => {
        this.setState({isLoggedIn: true});
        this.setState({user: {...user}});
        if (isAdmin) {
            this.setState({isAdmin: true});
        }
    };

    setLoggedOut = () => {
        this.setState({isLoggedIn: false})
    };

    addToCart = (card) => {
        this.setState({selectedProducts: [...this.state.selectedProducts, card]});
        this.setState({totalProducts: this.state.totalProducts + 1});
        this.setState({totalPrice: this.state.totalPrice + card.price})
    };

    showSignUp = () => {
        this.setState({showSignedUp: true})
    }


    render() {

        return (
            <div style={{
                padding: 40,
                backgroundImage: `url(${backround})`,
                minHeight: '1000px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <Toolbar isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} setLogOut={this.setLogOut}
                         totalProducts={this.state.totalProducts} selectedProducts={this.state.selectedProducts}/>
                <Switch>
                    <Route exact path={"/"} component={Home}/>
                    <Route path={"/Login"} render={(props) => <Login {...props} setLoggedin={this.setLoggedin}/>}/>
                    <Route path={"/Menu"} render={() => <PlantMenu addToCart={this.addToCart}
                                                                   isLoggedIn={this.state.isLoggedIn}/>}/>
                    <Route path={"/Signup"} render={() => <Signup setLoggedin={this.setLoggedin}/>}/>
                    <Route path={"/Admin"} render={() => <Admin isLoggedIn={this.state.isLoggedIn}
                                                                isAdmin={this.state.isAdmin}/>}/>

                    <Route path={"/ContactUS"} component={ContactUS}/>
                    <Route path={"/readme"} component={Readme}/>

                    <Route path={"/Checkout"} render={() => <Checkout setLoggedin={this.setLoggedin}
                                                                      selectedProducts={this.state.selectedProducts}
                                                                      isLoggedIn={this.state.isLoggedIn}
                                                                      totalPrice={this.state.totalPrice}/>}/>

                    <Route path={"/PlaceOrder"} render={() => <PlaceOrder user={this.state.user}
                                                                      selectedProducts={this.state.selectedProducts}
                                                                      isLoggedIn={this.state.isLoggedIn}
                                                                      totalPrice={this.state.totalPrice}/>}/>
                </Switch>
            </div>
        );
    }


}

