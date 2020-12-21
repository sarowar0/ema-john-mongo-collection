import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css'
const Shop = () => {
    document.title = 'Shop'
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])


    useEffect(() => {
        fetch('https://afternoon-cove-20073.herokuapp.com/products')
            .then(res => res.json())
            .then(products => setProducts(products))
    }, [])


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://afternoon-cove-20073.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [])


    const handlerCarBtn = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct]
        } else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count);
    };
    return (
        <div className='shopAndReviewContainer'>
            <div className='product-container'>
               
                {   
                    products.length > 0 ?
                    products.map(pd => <Product
                        showAddToCart={true}
                        product={pd}
                        handlerCarBtn={handlerCarBtn}
                        key={pd.key}
                    ></Product>)
                    :
                    <div className="spinner-border mx-auto mt-5 d-block" role="status"></div>
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <Link to="/review"><button>Review order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;