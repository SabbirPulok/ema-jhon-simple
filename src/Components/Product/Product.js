import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    console.log(props.product);
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <img src={img} alt=""/>
            <div>
                <h3 className="product-title">{name}</h3>
                <br/>
                <h4><small>by {seller}</small></h4>
                <br/>
                <h2>${price}</h2>
                <p><small>Only <b>{stock}</b> left in stock -- Order soon</small></p>
                <button onClick={ ()=>{props.handleAddProduct(props.product)} } className="product-cart-btn"><FontAwesomeIcon icon={faShoppingCart} />  ADD TO CART</button>
            </div>
        </div>
    );
};

export default Product;