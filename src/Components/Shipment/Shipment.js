import React from 'react';
import { useForm} from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useState } from 'react';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();
    const [orderPlacedId, setOrderPlaceId] = useState(null);

    const onSubmit = data => {
      const savedCart = getDatabaseCart();
      const userName = auth.user.name;
      const email = auth.user.email;
      const orderDetails = {name:userName,email,cart:savedCart};
      fetch('http://localhost:4200/placeOrder',{
        method:'POST',
        body: JSON.stringify(orderDetails),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(res=>res.json())
      .then(data=>{
        setOrderPlaceId(data._id);
        processOrder();
      })
    };
  
    return (
    orderPlacedId ? <button className="btn btn-warning p-5 m-3">Order Id {orderPlacedId} placed successfully. Thank You!</button>
      :
        <form className="ShipForm" onSubmit={handleSubmit(onSubmit)}>     
        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Full Name" />
        {errors.name && <span className="error">*Name is required</span>}

        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email"/>
        {errors.name && <span className="error">*Email is required</span>}
        
        <input name="AddressLine1" ref={register({ required: true })} placeholder="Address"/>
        {errors.name && <span className="error">*Address is required</span>}

        <input name="AddressLine2" placeholder="Address"/>

        <input name="city" ref={register({ required: true })} placeholder="City"/>
        {errors.name && <span className="error">*City is required</span>}

        <input name="country" ref={register({ required: true })} placeholder="Country"/>
        {errors.name && <span className="error">*Country is required</span>}
        
        <input name="zipcode" ref={register({ required: true })} placeholder="Zip code"/>
        {errors.name && <span className="error">*Zip code is required</span>}
        
        <input type="submit" />
      </form>
    
    );
};

export default Shipment;