import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    //const productPrice = cart.reduce((total,element)=>total+(element.price*element.quantity),0);
    
    let productPrice=0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        productPrice += (product.price*product.quantity);
        //debugger;
        
    }
    const tax = (productPrice/10);

    let shipping =0;
    if(productPrice>120)
    {
        shipping = 0;
    }
    else if(productPrice>65.99)
    {
        shipping =4.99;
    }
    else if(productPrice>0)
    {
        shipping = 12.00;
    }
    const grandTotal = (productPrice+shipping+tax).toFixed(2);
    
    return (
        <div>
            <h3>Order Summery</h3>
            <h4>Items ordered: {cart.length}</h4>
            <p>Product Price: {productPrice.toFixed(2)}</p>
            <p>Shipping Cost: {shipping.toFixed(2)}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <p>Total Price: {grandTotal}</p>
            {
                props.children
            }    
        </div>
    );
};

export default Cart;