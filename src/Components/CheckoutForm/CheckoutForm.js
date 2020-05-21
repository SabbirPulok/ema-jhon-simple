import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { processOrder } from '../../utilities/databaseManager';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess,setPaymentSuccess] = useState(null);
  const [paymentError,setPaymentError] = useState(null);
  const orderId = props.orderId;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if(error)
    {
        setPaymentError(error.message);
        setPaymentSuccess(null);
    }
    else
    {
        setPaymentError(null);
        setPaymentSuccess(paymentMethod);
        const payment = {id:paymentMethod.id, last4:paymentMethod.card.last4}
        props.handlePlaceOrder(payment);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
          paymentError && <h4 className="text-danger">{paymentError}</h4>
      }
      {
          paymentSuccess && <h4 className="text-success">Payment Successful and your order Id is {orderId}</h4>
      }
    </form>
  );
};

export default CheckoutForm;