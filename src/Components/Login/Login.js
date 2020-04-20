import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(()=>{
            window.location.pathname = '/review';
        })
    }
    const handleSignOut = () => {
        auth.signOut()
        .then(()=>{
            window.location.pathname = '/shop';
        })
    }
    //console.log(auth.user);
    return (
        <div>
            <h1>Join the party!!!</h1>
            {
                auth.user ? <button onClick={handleSignOut}>Sign Out</button> 
                : <button onClick={handleSignIn}>Sign-In</button>
            }
        </div>
    );
};

export default Login;