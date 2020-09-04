import React from "react";
import classes from './Toolbar.module.css';
import NavItem from '../NavItem/NavItem.js';
const toolbar = (prop) => (
    <header className={classes.Toolbar}>
       <ul className={classes.NavList}>
        <NavItem link ="/" active={true}>Home</NavItem>
        <NavItem link ="/" >Login/Logout</NavItem>
       </ul>
    </header>
);

export default toolbar;