import React, { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyShop from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
    document.title = 'Ema-john | Order review'
    const [cart, setCart] = useState([]);
    const [loadding, setLoading] = useState(true);
    const [placeOrder, setPlaceOrder] = useState(false);
    let history = useHistory()

    const handleProceedCheckout = () => {
        history.push('/shipment')
    }
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://afternoon-cove-20073.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => {
            setCart(data)
            setLoading(false)
        })

    }, [])

    const auth = useAuth();
    
  const message = placeOrder && <img src={happyShop} alt=""/>
    return (
        <div className='shopAndReviewContainer'>
            <div className="product-container">
                {
                    loadding ? 
                    <div className="spinner-border mx-auto d-block mt-5" role="status"></div>
                    :
                    cart.map(cart =>
                        <ReviewItems
                            removeProduct={removeProduct}
                            cart={cart}
                            key={cart.key}
                        ></ReviewItems>)
                }
                 {
                     message
                 }
                 {
                     !cart.length && <div>
                         <h3>No items in cart</h3>
                         <a href="/">Keep Shopping</a>
                     </div>
                 }
            </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        {   auth.user ?
                            <button onClick={handleProceedCheckout} className="cart-button">Procced shipment</button>
                            :<button onClick={handleProceedCheckout} className="cart-button">Procced checkout</button>
                        }
                    </Cart>
                </div>
        </div>
    );
};

export default Review;