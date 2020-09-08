import React from 'react';
import Login from './components/Pages/Login/Login'
import {Route, Switch} from 'react-router-dom';
import {BrowserRouter} from "react-router-dom";
import Toolbar from "./components/Pages/Toolbar/Toolbar";
import PlantMenu from "./components/Pages/PlantMenu/PlantMenu";
import Signup from "./components/Pages/Signup/Signup";
import Home from  "./components/funcComponents/Home/Home";

function App() {
  return (
    <div>
        <Route path={"/"} component={Toolbar}/>
        <Switch>
            <Route path={"/Login"} component={Login}/>
            <Route path={"/Menu"} component={PlantMenu}/>
            <Route path={"/Signup"} component={Signup}/>
      </Switch>
      </div>
  );
}

export default App;
