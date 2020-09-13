import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class plantItem extends Component {


    handleAddToCard = () => {
        this.props.addToCart(this.props.item);
    }

    render() {
        return (<div key={this.props.item.id} className="card" style={{width: '13rem', 'margin-right': '3rem'}}>
            <img className="card-img-top" src={this.props.item.url} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{this.props.item.name}</h5>
                <p className="card-text">{this.props.item.description}</p>
                {this.props.isLoggedIn &&
                <button onClick={this.handleAddToCard} className="btn btn-primary">Add to cart</button>}
            </div>
        </div>);
    }
}


export default plantItem;