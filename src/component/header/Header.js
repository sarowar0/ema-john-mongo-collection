import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/logo.png'
import Auth, { useAuth } from '../Login/useAuth';
import './Header.css'

const Header = () => {
    const auth = useAuth();
    
    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = "/"
        })
    }

    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <Link to="/">Home</Link>
                        <Link to="/shop">Shop</Link>
                        <Link to="/review">Order review</Link>
                        <Link to="/inventory">manage Inventory</Link>

                        {auth.user && <Link className='text-warning text-uppercase'>{auth.user.name}</Link>}
                        {
                            auth.user ?
                            <Link onClick={handleSignOut} >Sign Out</Link>
                            : <Link to='/login' >Sign In</Link>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;