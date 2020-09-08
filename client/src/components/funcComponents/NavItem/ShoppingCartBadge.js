import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import {FaShoppingCart} from "react-icons/fa";
import classes from './NavItem.module.css';


const shoppingCartBadge = (props) => (
    <React.Fragment className={classes.NavItem}>
        <Link to={props.link}>
            <Button variant="" style={{position: 'relative'}}>
                <FaShoppingCart className='mr-1' size='1.3em' color={'white'}/>
                <Badge style={{position: 'absolute', top: 2, right: -8}} pill variant="warning">{props.numOfItems}</Badge>
            </Button>
        </Link>
    </React.Fragment>
);

export default shoppingCartBadge;