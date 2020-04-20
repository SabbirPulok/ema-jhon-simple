import React, { useEffect } from 'react';
import './Review.css';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import thankYou from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [placedOrder, setplacedOrder] = useState(false);

    const auth =useAuth();

    // const handlePlaceOrder = () =>{
    //     setCart([]);
    //     setplacedOrder(true);
    //     processOrder();
    // }

    const handleRemoveProduct = (productKey)=>{ 
        const newCart = cart.filter((pd)=> pd.key!==productKey);//remove the productKey Element
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(()=>{
            const savedCart = getDatabaseCart();
            const productKeys = Object.keys(savedCart);
            const cartProducts = productKeys.map(key => {
                const product= fakeData.find(pd => pd.key===key)
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
        },[])
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem 
                        key = {pd.key}
                        handleRemoveProduct ={handleRemoveProduct}
                        product={pd}></ReviewItem>)
                }
                {
                    !(cart.length) && <h1>No items added. <a href="/shop" alt="">Keep Shopping</a></h1>
                }
                {placedOrder && <img src={thankYou} alt=""/>}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to = "/shipment">
                        {
                            auth.user ? <button className="product-cart-btn">Proceed to Shipment!</button>
                            : <button className="product-cart-btn">Login to Proceed</button>
                        }
                        
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;