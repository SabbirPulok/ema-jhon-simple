import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect} from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const auth = Auth();
    return <AuthContext.Provider value = {auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  
const Auth = () => {
    const [user,setUser] = useState(null);

    const getUser = (user) => {
        const {displayName,email,photoURL} = user;
            return {
                name: displayName,
                email,
                photo: photoURL
            }
    }

    const signInWithGoogle = () => 
    {
        const provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth().signInWithPopup(provider)
        .then(response => {
            const signInUser = getUser(response.user);
            setUser(signInUser); 
        })
        .catch(error => {
            setUser(null);
            return error.message;
        })

    }
    const signOut = () => {
        return firebase.auth().signOut()
        .then(response => {
            setUser(null);
        })
        .catch(error => {
            return error.message;
        })

    }
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(
            function (user)
            {
                if(user)
                {
                    const currentUser = getUser(user);
                    setUser(currentUser);
                }
            }
        )
    },[])
    return{
        user, signInWithGoogle, signOut
    }
    
}

export default Auth;