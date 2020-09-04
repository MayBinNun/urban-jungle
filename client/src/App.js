import React from 'react';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login'
import {Route} from 'react-router-dom';
import {BrowserRouter} from "react-router-dom";
function App() {
  return (
    <div>
    <Route path={"/"} component={Layout}/>
    <Route path={"/Login"} component={Login}/>
    </div>
  );
}

export default App;
