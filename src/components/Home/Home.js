import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Product from '../Product/Product';
import './Home.css'

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://evening-stream-59893.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <>
            <Header></Header>
            {products.length ?
                <div></div>
                :
                <div id='loading-spinner'>
                    <div className='loader'></div>
                </div>}
            <div className="products">
                {
                    products.map(product => <Product product={product} key={product._id}></Product>)
                }
            </div>
        </>
    );
};

export default Home;