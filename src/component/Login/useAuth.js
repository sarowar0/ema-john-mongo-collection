import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { createContext } from "react";
import { useState } from "react";
import firebaseConfig from '../../firebase.config';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

//Create auth custom hooks
const AuthContext = createContext();
export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext);

//Private Route
export const PrivateRoute = ({ children, ...rest }) => {
    let auth = useAuth();
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
  
// Redirect


//Common authUserInfo function
const getUser = (user) => {
    const { displayName, email, photoURL } = user;
    return { name: displayName, email, photo: photoURL };
}



const Auth = () => {

    const [user, setUser] = useState(null)

    //Google
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(res => {
                const signInUser = getUser(res.user);
                setUser(signInUser)
                // window.location.pathname = '/review'
                return res.user;
            })
            .then(err => {
                return err.message
            })
    }

    //Facebook sign in 
    const signInWithFb = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(res => {
                const signInUser = getUser(res.user)
                setUser(signInUser)
                return res.user;
            }).catch(err => {
                console.log(err.message);
                return err.message
            });
    }
    //Sign Out
    const signOut = () => {
        return firebase.auth().signOut()
            .then(function () {
                setUser(null)
                return true
            })
            .catch(function (error) {
                console.log(error);
                return false
            });
    }
    //On state change handler
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (usr) {
            if (usr) {
                const currentUser = getUser(usr)
                setUser(currentUser)
            } else {
                // No user is signed in.
            }
        });
    }, [])

    return {
        user,
        signInWithGoogle,
        signInWithFb,
        signOut
    }
}
export default Auth;

