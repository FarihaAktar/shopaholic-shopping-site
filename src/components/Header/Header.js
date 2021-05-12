import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import './Header.css'
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Navbar className='navbar' collapseOnSelect expand="lg">
            <Navbar.Brand className='logo' href="#home">SHOPAHOLIC</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="/orders">Orders</Link>
                    <Link className="link" to="/addProducts">Admin</Link>
                    <Link className="link" to="/">Deals</Link>

                </Nav>
                <Nav>
                    {loggedInUser.email && (
                        <div className='user-info'>
                            <img src={loggedInUser.photo } alt="" />
                            <h4 className='user-name'>{loggedInUser.displayName || loggedInUser.name}</h4>
                        </div>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;