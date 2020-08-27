import React from "react";
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) =>(
    <div className={layout}>
        <Toolbar/>
    <div>ToolBar, Footer</div>
    <main>
        {props.children}
    </main>
    </div>
);

export default layout;