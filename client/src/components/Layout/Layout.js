import React from "react";
import Toolbar from '../Navigation/Toolbar/Toolbar';

import classes from './Layout.module.css';

const layout = (props) =>(
    <div className={classes.layout}>
        <Toolbar/>
    <div className={classes.Content}>ToolBar, Footer</div>
    <main className={classes.Content}>
        {props.children}
    </main>
    </div>
);

export default layout;