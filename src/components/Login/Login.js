import React, { useContext, useState } from 'react';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [users, setUsers] = useState({})
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((res) => {
                const { email, displayName, photoURL } = res.user;
                const signInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUsers(signInUser);
                setLoggedInUser(signInUser);
                history.replace(from);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    const handleSignIn = (e) => {
        alert("Continue with google sign in")
        e.preventDefault();
    }

    return (
        <div>
            <Navbar expand="lg" variant="light" bg="light">
                <Navbar.Brand className='logo'>
                    <Link to='/'>SHOPAHOLIC</Link>
                </Navbar.Brand>
            </Navbar>
            <div className="form">

                <h2>Login</h2>
                <form onSubmit={handleSignIn}>
                    <input className="input-text-login" type="email" name="email" required placeholder="Email" />
                    <br />
                    <input className="input-text-login" type="password" name="password" required placeholder="Password" />
                    <br />
                    <br />
                    <input type="checkbox" name="user" id="" />
                    <label htmlFor="user"> Remember Me</label>
                    <a className="forgot-tag" href="/account">Forgot Password</a>
                    <input className="form-button" type="submit" value="Login" />

                    <div className="comment">
                        <h4>Don't have an account?</h4>
                        <h5>Create an account</h5>

                    </div>
                </form>
            </div>
            <div className="social-media">
                <h5>Or</h5>
                <div onClick={googleSignIn} className="social-icon-text">
                    <FontAwesomeIcon className="social-icon" icon={faGoogle} />
                    <h5 >Continue with Google</h5>
                </div>
            </div>
        </div>
    );
};

export default Login;