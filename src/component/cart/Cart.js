import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    let total =0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = parseFloat((total + product.price).toFixed(2))
        
    }
    
    let shipping = 0;
    if(cart.length === 0){
        shipping = 0
    }else if(cart.length <= 2){
        shipping = 10;
    }else if(cart.length <=5){
        shipping = 8
    }else if (cart.length > 5) {
        shipping = 5
    }

    const tax = parseFloat((total/10).toFixed(2))
    const grandTotal = ((total + shipping + tax).toFixed(2));
    return (
        <div className='cart'>
            <h5>Total Summary</h5>
            <h6 className='mb-3'>Total Ordered: {cart.length}</h6>
            <p>Order price: <span>$ {parseFloat(total.toFixed(2))}</span></p>
            <p>Shipping const: <span> $ {shipping}</span></p>
            <p>Tax: <span>$ {tax}</span></p>
            <p>Grand Total:$ <span>{grandTotal}</span></p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;