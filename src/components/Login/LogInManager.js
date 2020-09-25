import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeFirebaseLogin = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
                .then(result => {
                    var token = result.credential.accessToken;
                    const { displayName, email, photoURL } = result.user;
                    const userData = {
                        isLogIn: true,
                        displayName: displayName,
                        email: email,
                        photo: photoURL,
                        success: true
                    }
                    return userData;
                })
                .catch(error =>{
                    console.log(error.message) 
                });
}

export const googleSignOut=()=>{
    return firebase.auth().signOut()
    .then(result => {
        const user = {
            isLogIn: false,
            displayName: '',
            photo: '',
            email: ''
        }
        return user;
    }).catch(error => {
        console.log(error.message)
    });
}

export const createUserWithEmailAndPassword = (name, email, password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(response =>{
            const newUserInfo = response.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserInfo(name);
            return newUserInfo;
        })
        .catch(function (error) {
            console.log("user not created in database")
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserInfo=(userInfo)=>{
    let user = firebase.auth().currentUser;
    userInfo.updateProfile({
        displayName:user,
    })
    .then(()=>{
    })
    .catch(error=>console.log(error))
}

export const signInWithEmailAndPassword = (email, password)=>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
            .then(response=>{
                const newUserInfo = response.user;
                newUserInfo.error = '';
                newUserInfo.success = true;
                return newUserInfo;
            })
            .catch(error=>{
                const newUserInfo = {};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                return newUserInfo
            })
}

export const signInWithFb = () => { 
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(function (result) {
        var user = result.user;
        user.success = true;
        return user;
    }).catch(function (error) {
    });
}