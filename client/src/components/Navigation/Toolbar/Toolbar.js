import React from "react";
import classes from './Toolbar.module.css'

const toolbar = (prop) => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <div>Logo</div>
    </header>
);

export default toolbar;