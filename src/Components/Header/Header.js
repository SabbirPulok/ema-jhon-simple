import React from 'react';
import './Header.css'
import logo from '../../images/logo.png';
import { useAuth } from '../Login/useAuth';


const Header = () => {
    const auth = useAuth();
    
    return (
        <div className="Header">
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory Here</a>
                {
                    auth.user && <span style={{color:'yellow'}}>
                        {auth.user.name}
                        </span>
                }
                {
                    auth.user ?  <button className="btn" onClick={auth.signOut}>Sign Out</button>
                        : <button className="btn" onClick={auth.signInWithGoogle}>Sign In</button>
                }
            </nav>
        </div>
    );
}
 export default Header;