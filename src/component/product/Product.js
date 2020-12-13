import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'
const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt="" />
            </div>
            <div className='product-content'>
                <h6 className='product-name'> <Link to={"/product/"+key}>{name}</Link></h6>
                <p><small>By {seller}</small></p>
                <p className='font-weight-bold'>${price}</p>
                <p>Only {stock} left in stock - order soon</p>
                <button onClick={() => props.handlerCarBtn(props.product)} className='common-button'>
                    <i className="fa fa-shopping-cart pr-2"></i>
                    add to cart
                </button>
            </div>
        </div>
    );
};

export default Product;