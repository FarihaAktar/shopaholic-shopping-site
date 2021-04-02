import React, { useState } from 'react';
import axios from 'axios';
import './AddProducts.css';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddProducts = () => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const handleImageUpload = (e) => {
        const imageData = new FormData();
        imageData.set('key', '05ff30680dcbc5e1009f9920a7b736c2');
        imageData.append('image', e.target.files[0]);
        alert('Wait 10 seconds before clicking on the submit button to process the file...')

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                console.log(response?.data?.data?.display_url)
                setImageURL(response?.data?.data?.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onSubmit = data => {
        const productData = {
            productName: data.name,
            price: data.price,
            quantity: data.quantity,
            imageURL: imageURL,
        }
        // console.log(productData.imageURL);

        if (productData.imageURL !== null) {
            const url = 'https://evening-stream-59893.herokuapp.com/addProduct';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
                .then(res => {
                    console.log('server site response', res);
                    alert("Product is submitted successfully")
                })

        }
        else{
            alert("Your file is not ready yet..please wait!")
        }

    };


    return (
        <div className="grid-container">
            <ul className='item1'>
                <li>
                    <h2>Shopaholic</h2>
                </li>
                <li>
                    <Link to='/manageProduct'><FontAwesomeIcon className='add-icon' icon={faThLarge} /> Manage Product</Link>
                </li>
                <li>
                    <Link to='/addProducts'><FontAwesomeIcon className='add-icon' icon={faPlus} /> Add Product</Link>
                </li>
            </ul>
            <form className='item2' onSubmit={handleSubmit(onSubmit)}>
                <div className='input-1'>
                    <p className='input-header'>Product Name:</p>
                    <input className='input-text' name="name" placeholder='Enter Name' required ref={register} />
                    <br />
                    <br />
                    <p className='input-header'>Add Price:</p>
                    <input className='input-text' name="price" id='priceName' placeholder="Enter Price" required ref={register} />
                </div>

                <div>
                    <p className='input-header'>Add Quantity:</p>
                    <input className='input-text' name="quantity" id='weight' placeholder="Enter Quantity" required ref={register} />
                    <br />
                    <br />
                    <p className='input-header'>Add Photo:</p>
                    <input className='input-file' name="exampleRequired" type='file' required onChange={handleImageUpload} />
                    <input className='input-submit' type="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddProducts;