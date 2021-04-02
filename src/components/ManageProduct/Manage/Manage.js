import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Mange.css'

const Manage = ({ product }) => {
    const { productName, quantity, price, _id } = product;

    const deleteProduct = (id) => {
        fetch("https://evening-stream-59893.herokuapp.com/delete/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log("deleted successfully", result);
                alert("Product is deleted successfully!")
            })
    }
    return (
        <tr>
            <td>{productName}</td>
            <td>{quantity}</td>
            <td>${price}</td>
            <td onClick={() => deleteProduct(_id)}><FontAwesomeIcon className='manage-icon' icon={faTrashAlt} /> </td>
        </tr>
    );
};

export default Manage;