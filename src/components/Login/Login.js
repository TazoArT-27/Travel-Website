import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import { nameChecking, emailChecking, passwordChecking } from './FormValidation';
import { googleSignIn, googleSignOut, signInWithFb, createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeFirebaseLogin } from './LogInManager';
import { UserContext } from '../../App';
import FacebookIcon from '@material-ui/icons/Facebook';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { Button } from '@material-ui/core';

const Login = () => {
    initializeFirebaseLogin();
    const [nameValidation, setNameValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [passConfMessage, setPassConfMessage] = useState("")
    const [error, setError] = useState("")

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        photo: '',
        email: '',
        password: '',
        confirmPassword: false,
        success: false,
        error: ''
    })
    const [loggedInUser, setLoggedInUser] = useContext(UserContext); 
    const [loader, setLoader] = useState(false);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } }


    const handleResponse = (res, redirect) => { 
        if (res.error) {
            document.getElementById("form").reset();
            newUser && setError(res.error)
            !newUser && setError(res.error)
        } else {
            setUser(res);
            setLoggedInUser(res)
            setLoggedInUser(res)
            setLoader(false)
            redirect && history.replace(from);
            newUser && setError("")
            !newUser && setError("")
        }
    }
    const googleSignedIn = () => { 
        googleSignIn()
        .then(res => {
            res && handleResponse(res, true);
        })
    }

    const fbSignedIn = () => { 
        signInWithFb()
        .then(res => {
            handleResponse(res, true)
        })
    }
    const handleSubmit = (e) => {
        console.log("submitting.....", user)
        setError("")
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 2000)

        if (newUser && user.name && user.email && user.password) { 
            if (user.confirmPassword) {
                createUserWithEmailAndPassword(user.name, user.email, user.password)
                    .then(res => {
                        handleResponse(res, true);
                    })
            }
        }
        if (!newUser && user.password && user.email) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }

    

    const saveFormData = (e) => { 
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
        console.log("updated info", user, newUserInfo)
    }
    const clearInputData = (e, msg) => { 
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = "";
        setUser(newUserInfo);
    }
    const nameCheck = (e) => { 
        const valid = nameChecking(e);
        const msg = "Enter a valid name!"
        if (valid) {
            saveFormData(e)
            setNameValidation("")
        } else {
            clearInputData(e, msg)
            setNameValidation(msg)
        }
    }
    const emailCheck = (e) => { 
        const valid = emailChecking(e);
        if (valid) {
            saveFormData(e)
            setEmailValidation("")
        } else {
            clearInputData(e)
            setEmailValidation("Enter a valid email!")
        }
    }

    const passwordCheck = (e) => { 
        const valid = passwordChecking(e);
        if (valid) {
            saveFormData(e)
            setPasswordValidation("")
        } else {
            clearInputData(e)
            setPasswordValidation("Enter a valid password!")
        }
    }

    const confirmPasswordCheck = (e) => { 
        if (e.target.value === user.password) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = true;
            setUser(newUserInfo);
            setPassConfMessage("");
        } else {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = false;
            setUser(newUserInfo);
            setPassConfMessage("Password doesn't match!");
        }
    }




    return (
        <div className="login d-flex justify-content-center p-5">
            <div className="login-form w-50 p-5">

                <div className="text-center">
                    {newUser ? <h3 className="text">Create an account</h3> : <h3 className="text">Login</h3>} 
                    {
                        loader &&
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    <br/><br/>
                </div>

                <div className="form-area">
                <form onSubmit={handleSubmit} id="form">
                    {newUser && <> <input className="form-control" onChange={nameCheck} name="name" type="text" placeholder="Name" required /><br />
                        {nameValidation.length > 0 ? <small style={{ color: 'red' }}>{nameValidation} <br /><br /></small> : <small></small>}
                    </>}

                    <input className="form-control" onChange={emailCheck} name="email" type="text" placeholder="Email" required />  <br />
                    {emailValidation.length > 0 ? <small style={{ color: 'red' }}>{emailValidation} <br /><br /></small> : <small></small>}

                    <input className="form-control" onChange={passwordCheck} name="password" type="password" placeholder="Password" required />  <br />
                    {passwordValidation.length > 0 ? <small style={{ color: 'red' }}>{passwordValidation} <br /><br /></small> : <small></small>}

                    {newUser && <> <input className="form-control" onChange={confirmPasswordCheck} name="confirmPassword" type="password" placeholder="Confirm Password" required /><br />
                        {passConfMessage.length > 0 ? <small style={{ color: 'red' }}>{passConfMessage} <br /><br /></small> : <small></small>}
                    </>}

                    {!newUser && <><input type="checkbox" /> <small> Remember me </small></>}
                    
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <Button className="my-4" variant="contained" style={{ backgroundColor: '#fbbc04', width: '100%', outline:'none'}}>
                        {newUser ? 'Create New Account' : 'Log In'}
                    </Button>

                    {
                        newUser
                            ?
                            <> <span>Already have an account?</span> <button className="button" type="button" style={{ color: '#fbbc04' }} onClick={() => setNewUser(!newUser)}>Login</button> </>
                            :
                            <> <span>Don't have an account?</span> <button className="button" type="button" style={{ color: '#fbbc04' }} onClick={() => setNewUser(!newUser)}>Create an account</button> </>
                    }

                </form>
                </div>
                <br />

                <div className="d-flex justify-content-center text-mute">Or</div>
                <br />
                {
                <Button style={{margin: '8px',outline: 'none', width: '100%'}} color="secondary"  variant="contained" onClick={googleSignedIn}>
                <PersonPinIcon style={{marginRight:'5px'}}></PersonPinIcon>Sign In With Google
                </Button>
                }
                <br/>
                <Button style={{margin: '8px', outline: 'none', width: '100%'}} onClick={fbSignedIn} variant="contained" color="primary">
                    <FacebookIcon style={{marginRight:'5px'}}></FacebookIcon>Sign in with Facebook
                </Button>
                <br/>
            </div>
        </div>
    );
};

export default Login;