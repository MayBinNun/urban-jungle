import React, {Component} from "react";
import classes from './Toolbar.module.css';
import NavItem from '../../funcComponents/NavItem/NavItem';
import "bootstrap/dist/css/bootstrap.min.css";

class Toolbar extends Component {


    render(){
        return(
        <header className={classes.Toolbar}>
            <ul className={classes.NavList}>
                <NavItem link ="/" active={true}>Home</NavItem>
                <NavItem link ="/Menu" >Shop Plants</NavItem>
                <NavItem link ="/" >Contact Us</NavItem>
                <NavItem link ="/">Contact Us</NavItem>
            </ul>

            <NavItem link ="/Login" >Login/Logout</NavItem>

        </header>);
    }



}

export default Toolbar;