import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

const Product = ({ product }) => {
    const { imageURL, productName, price, quantity, _id } = product;
    return (
        <div className='product-item'>
            <img src={imageURL} alt="" />
            <div className='product-detail'>
                <h6 className='pd-name'>{productName} </h6>
                <h6 className='pd-quantity'>Quantity: {quantity}</h6>

            </div>
            <div className='product-btn'>
                <Link to={'/checkout/' + _id}>
                    <button className='pd-btn'>Order Now</button>
                </Link>
                <h5 className="price">${price}</h5>
            </div>
        </div>
    );
};

export default Product;