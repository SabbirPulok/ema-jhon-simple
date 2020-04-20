import React from 'react';
import './ReviewItem.css';
const ReviewItem = (props) => {
    const {name,quantity,price,key} = props.product;

    return (
        <div className="Review-Item">
            <h2 className="product-title">{name}</h2>
            <h3>Quantity: {quantity}</h3>
            <p><small>${price}</small></p>

            <button 
                className="product-cart-btn"
                onClick = {() => {props.handleRemoveProduct(key)}}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;