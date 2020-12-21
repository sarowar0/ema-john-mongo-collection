import React from 'react';
// import fakeData from '../../fakeData';

const Inventory = () => {

    const handleProduct = () => {        
        fetch('https://afternoon-cove-20073.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then(result => console.log(result))
    }

    return (
        <div>
            <button onClick={handleProduct} className='btn btn-primary'>Add Product</button>
        </div>
    );
};

export default Inventory;