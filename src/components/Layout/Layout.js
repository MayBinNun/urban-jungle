import React from "react";

const layout = (props) =>(
    <div>
    <div>ToolBar, Footer</div>
    <main>
        {props.children}
    </main>
    </div>
);

export default layout;