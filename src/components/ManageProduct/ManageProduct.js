import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Manage from './Manage/Manage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './ManageProduct.css'

const ManageProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://evening-stream-59893.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div className='grid-container'>
            <ul className=' item1'>
                <li >
                    <h2>Shopaholic</h2>
                </li>
                <li>

                    <Link to='/manageProduct'><FontAwesomeIcon className='add-icon' icon={faThLarge} /> Manage Product</Link>
                </li>
                <li>
                    <Link to='/addProducts'><FontAwesomeIcon className='add-icon' icon={faPlus} /> Add Product</Link>
                </li>
            </ul>
            <table className='table'>
                <thead className='thead'>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => <Manage key={product._id} product={product}></Manage>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageProduct;