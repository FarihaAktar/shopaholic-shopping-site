import React from 'react';


const Order = (props) => {
    const { orderTime, product } = props.pd;
    return (
        <>
            
            <tr>
                <td>{orderTime}(Date)</td>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>$ {product.price}</td>
            </tr>
        </>
    );
};

export default Order;