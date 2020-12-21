import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css'


const ProductDetails = () => {
    document.title = 'Ema-john | Product Details'
    const { productKey } = useParams();
    const [loadding, setLoading] = useState(true)
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://afternoon-cove-20073.herokuapp.com/product/${productKey}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
    }, [productKey])

    const { name, img, features, price, seller, category, stock } = product;
    return (
        <>
            {
                loadding ?
                    <div className='spinner-border mx-auto d-block mt-5' role='status'></div>
                    :
                    <div className='product-details'>
                        <img src={img} alt="" />
                        <div className='product-details-content ml-4'>
                            <h5>{name}</h5>
                            <p><strong>${price}</strong></p>
                            <p><small>Sold by : {seller}</small></p>
                            <p>Category: {category}</p>
                            <p>Total stock in available {stock}</p>
                            <h6 className='border-bottom'>Feature</h6>
                            {features &&
                                features.map(feature => <li>{feature.description} : <strong>{feature.value}</strong></li>)
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default ProductDetails;