import React from 'react';
import './Shop.css'
import fakeData from '../../fakeData';
import { useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [product,setProduct] = useState(first10);
    const [cart,setCart] = useState([]);

    const handleAddProduct = (product) => { 
        const newCart = [...cart,product];
        setCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    product.map(p => <Product handleAddProduct= {handleAddProduct} product={p}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;