import React, { useState } from 'react';
import './ReviewItems.css'
const ReviewItems = (props) => {
    const { name, quantity, seller, price, key } = props.cart;

    return (
        <div className='product-review'>
            <h6>{name}</h6>
            <div className='review-content'>
                <div>
                    <p><strong>${price}</strong></p>
                    <p><small>Sold by {seller}</small></p>
                    <p>Quantity {quantity}</p>
                    <button onClick={() => props.removeProduct(key)} className='common-button'>Remove</button>
                </div>
                <div className='shipping-option'>
                    <h6>Shipping option</h6>
                    <div>
                        <input type="radio" name="shipping" id="" />
                        <span>
                            <span className='text-success font-weight-bold ml-2'>8-10 Working days</span><br />
                            <span><small>$ -0 Free shipping</small></span>
                        </span>
                    </div>
                    <div>
                        <input type="radio" name="shipping" id="" />
                        <span>
                            <span className='text-success font-weight-bold ml-2'>5-7 Working days</span><br />
                            <span><small>$ -5 Regular shipping</small></span>
                        </span>
                    </div>
                    <div>
                        <input type="radio" name="shipping" id="" />
                        <span>
                            <span className='text-success font-weight-bold ml-2'>2-5 Working days</span><br />
                            <span><small>$ -10 Standard shipping</small></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItems;