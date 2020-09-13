import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PlantsShop2 from "../../../assets/PlantsShop2.jpg";

const Home = (props) => (
    <div className="card mb-3"
         style={{
             padding: 40,
             backgroundImage: `url(${PlantsShop2})`,
             minHeight: '500px',
             backgroundSize: 'cover',
             backgroundPosition: 'center'
         }}>

            <div className="card-body" style={{color:"white"}}>
                <h1 className="card-title">Welcome To Urban Jungle</h1>
                <p className="card-text">Urban Jungle helps you discover the best plants for your</p>
                <p className="card-text">space, delivers them to your door</p>
                <p className="card-text">and helps you look after them.</p>
            </div>
    </div>
);

export default Home;