import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props.product);
    const { img, name, seller, price, stock,key } = props.product;
    return (
        <div className="product">
            <img src={img} alt=""/>
            <div>
                <h3 className="product-title"><Link to={"/product/"+key}>{name}</Link></h3>
                <br/>
                <h4><small>by {seller}</small></h4>
                
                <h2>${price}</h2>
                <p><small>Only <b>{stock}</b> left in stock -- Order soon</small></p>
                {props.showAddToCart && <button onClick={ ()=>{props.handleAddProduct(props.product)} } className="product-cart-btn"><FontAwesomeIcon icon={faShoppingCart} />  ADD TO CART</button>}
                {/* if props.showAddToCart is True === && */}
            </div>
        </div>
    );
};

export default Product;