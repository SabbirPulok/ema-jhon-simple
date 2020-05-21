import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import { useState } from 'react';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_OQEBRgJoKCwrP4nH7ootWy3d004lm2Cs5f');

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const auth = useAuth();
  const [orderPlacedId, setOrderPlaceId] = useState(null);
  const [shipInfo, setShipInfo] = useState(null);

  const onSubmit = data => {
    setShipInfo(data);
  };

  const handlePlaceOrder = (payment) =>{
    const savedCart = getDatabaseCart();
    const userName = auth.user.name;
    const email = auth.user.email;
    const orderDetails = { 
      name: userName, 
      email, 
      cart: savedCart, 
      shipment: shipInfo,
      payment
    };
    fetch('https://ema-john-simple-sabbir.herokuapp.com/placeOrder', {
      method: 'POST',
      body: JSON.stringify(orderDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(order => {
        setOrderPlaceId(order._id);
        clearLocalShoppingCart();
      })
  }

  return (
    <div className="container">
      <div className="row">
        <div style={{display: shipInfo && 'none'}} className="col-md-6">
            <div className="ShipForm">
              <h3>Shipment Information</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Full Name" />
                {errors.name && <span className="error">*Name is required</span>}

                <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email" />
                {errors.name && <span className="error">*Email is required</span>}

                <input name="AddressLine1" ref={register({ required: true })} placeholder="Address" />
                {errors.name && <span className="error">*Address is required</span>}

                <input name="AddressLine2" placeholder="Address" />

                <input name="city" ref={register({ required: true })} placeholder="City" />
                {errors.name && <span className="error">*City is required</span>}

                <input name="country" ref={register({ required: true })} placeholder="Country" />
                {errors.name && <span className="error">*Country is required</span>}

                <input name="zipcode" ref={register({ required: true })} placeholder="Zip code" />
                {errors.name && <span className="error">*Zip code is required</span>}

                <input className="btn btn-primary"type="submit" />
            </form>
          </div>     
        </div>
        <div style={{display: shipInfo ? 'block':'none'}} className="col-md-6">
            <h3>Payment Information</h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm orderId={orderPlacedId} handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
            </Elements>
        </div>
      </div>
    </div>
  );
};

export default Shipment;