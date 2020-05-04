import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
     const {productKey} = useParams();
    const [product,setProduct] = useState(null);
    
    useEffect(()=>{
        fetch('http://localhost:4200/products/'+productKey)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[productKey])
    return (
        <div>
            <h2>Product Details</h2>
            {
                product && <Product product={product} showAddToCart={false}></Product>
            }
        </div>
    );
};

export default ProductDetails;