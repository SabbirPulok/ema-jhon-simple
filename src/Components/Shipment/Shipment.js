import React from 'react';
import { useForm} from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { console.log(data) };

    const auth = useAuth();
  
    return (
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