import React from "react";
import Toolbar from '../Navigation/Toolbar/Toolbar';

import classes from './Layout.css';
const layout = (props) =>(
    <div className={classes.layout}>
        <Toolbar/>
    <div>ToolBar, Footer</div>
    <main className={classes.content}>
        {props.children}
    </main>
    </div>
);

export default layout;