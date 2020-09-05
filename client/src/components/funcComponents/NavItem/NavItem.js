import React from "react";
import classes from './NavItem.module.css';
import {Link} from "react-router-dom";

const navItem = (props) => (
    <li className={classes.NavItem}>
        <Link to ={props.link}
        className={props.active ? classes.active : null}>{props.children}</Link>
    </li>
);

export default navItem;