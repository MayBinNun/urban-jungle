import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Readme = (props) => (
    <div className="card mb-3"style={{marginTop:"60px"}}>

            <div className="card-body" style={{color:"green"}}>
                <h1 className="card-title">Welcome To Urban Jungle</h1>
                <p className="card-text">Urban Jungle helps you discover the best plants for your space, delivers them to your door</p>
                <p className="card-text">and helps you look after them.</p>
                <p className="card-text"> What additional page(s) did you add? Contact Us page</p>
                <p className="card-text"> What was hard to do? Planning the project, learning react, sync the backend and front</p>
                <p className="card-text"> Who is your partner? Itay Gershon - ID: 308493808</p>
                <p className="card-text"> How did you make your store secured? </p>
                <p className="card-text"> Did you implement the store using react.js? yes </p>
            </div>
    </div>
);

export default Readme;