import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import Order from './Order/Order';
import './Orders.css'

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [order, setOrder] = useState([])
    const [buyer, setBuyer] = useState({})

    useEffect(() => {
        fetch('https://evening-stream-59893.herokuapp.com/orders?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => {
                setOrder(data)
                setBuyer(data[0])
            })
    }, [])
    
    return (
        <>
            <Header></Header>
            <div className='order-section'>
                {order === undefined || order.length === 0 ?
                    <h1>You haven't order anything, place an order..</h1>
                    :
                    <>
                        <div className='buyer'>
                            <img src={buyer.photo} alt="" />
                            <h4>Name: <span className='name'> {buyer.name}</span></h4>
                            <h4>Email: <span className='name'>{buyer.email}</span> </h4>
                        </div>
                        <hr />
                        <div className='buyer-order-detail'>
                            <h2>Product Ordered: {order.length} </h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order Placed</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        order.map(pd => <Order key={pd._id} pd={pd}></Order>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>


                }

            </div>
        </>
    );
};

export default Orders;