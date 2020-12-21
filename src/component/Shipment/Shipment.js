import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';
import { useHistory } from 'react-router-dom';

const Shipment = () => {
    const auth = useAuth()
    const history = useHistory();

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = {...auth.user, shipment:data, product: savedCart };
        fetch('https://afternoon-cove-20073.herokuapp.com/order', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(result => {
            if (result) {
                processOrder()
                alert("Shipment procced successfully")
                history.push('/review')
            }
        })
    };

    return (
        <form className='shipment-form' onSubmit={handleSubmit(onSubmit)}>
            {
                auth.user && <input className='form-control text-capitalize' defaultValue={auth.user.name} name="name" ref={register({ required: true })} placeholder="Name"/>
            }
            {errors.name && <span>Name is required</span>}          
  
            {   
                auth.user && 
                <input className='form-control' defaultValue={auth.user.email} name="email" ref={register({ required: true })} placeholder="Email address"/>
            }
            {errors.email && <span>Email address is required</span>}
            <input className='form-control' name="phone" ref={register({ required: true })} placeholder="Phone number"/>
            {errors.phone && <span>Phone number is required</span>}
            <input className='form-control' name="addressline1" ref={register({ required: true })} placeholder="Address line 1"/>
            {errors.addressline1 && <span>Addess line 1 required</span>}
            <input className='form-control' name="addressline2" ref={register()} placeholder="Address line 2 (Optional)"/>
            <input className='form-control' name="city" ref={register({ required: true })} placeholder="City"/>
            {errors.city && <span>City is required</span>}
            <input className='form-control' name="country" ref={register({ required: true })} placeholder="Country"/>
            {errors.country && <span>Country is required</span>}
            <input className='form-control' name="zipcode" ref={register({ required: true })} placeholder="Zip Code"/>
            {errors.zipcode && <span>Zipe Code is required</span>}
            <input className='form-control' type="submit" />
        </form>
    );
};

export default Shipment;