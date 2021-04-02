import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './CheckOut.css'

const CheckOut = () => {
    const { key } = useParams();
    const [product, setProduct] = useState({});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://evening-stream-59893.herokuapp.com/product/' + key)
            .then(res => res.json())
            .then(data => setProduct(data[0]))

    }, [])

    const handleOrderPlace = () => {
        const checkout = { ...loggedInUser, product: product, orderTime: new Date().toDateString('dd/MM/yyyy') }

        fetch('https://evening-stream-59893.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkout)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Your Order Placed Successfully')
                }
            })
    }
    return (
        <>
            <Header></Header>
            <div className='checkout-section'>
                <div>
                    <img src={product.imageURL} alt="" />

                </div>
                <div className='checkout-details'>
                    <h1 className='checkout'>Checkout</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>{product.productName}</td>
                                <td>{product.quantity}</td>
                                <td>${product.price}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={handleOrderPlace} className='check-btn'>Checkout</button>

                </div>
            </div>
        </>
    );
};

export default CheckOut;