import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import '../style/Login.css';
import { register, login } from "../axios-services";

const Login = ({setAuthenticated, currentUser, setCurrentUser, setCartList}) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [gotError, setGotError] = useState(null);
    const history = useHistory()

    const handleClick = async (event) => {
        event.preventDefault();
        setIsRegistering(!isRegistering);
        setGotError(false);
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        setGotError(false);
        const newUser = {
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }
        try{
            if (!newUser.email || !newUser.email || !newUser.password){
                throw new Error("Required information missing")
            }
            else if (newUser.password !== document.getElementById('confirm-password').value){
                throw new Error("Password and confirm password must match");
            };
            await register(newUser)
            .then((result) => {
                console.log(result)
                if (result.success === false){
                    throw new Error("User already exists");
                }
            })
            setAuthenticated(true);
        } catch (error){
            setGotError(error);
        }
    }

    const handleLogin = async (event) => {
        setGotError(false);
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            await login(username, password)
            .then((result) => {
                setCurrentUser(result.data.user)
                sessionStorage.setItem("token", result.data.token);
                sessionStorage.setItem("username", username);
            });
            setAuthenticated(true);
            history.push("/")
        } catch(error) {
            const invalidCredentials = new Error("Invalid credentials, please try again");
            console.error(invalidCredentials)
            setGotError(invalidCredentials);
        }
    }

    const handleVisibility = event => {
        setVisibility(!visibility);
    }

    return (
        <div id="login">
            {isRegistering?
                <Fragment>
                    <span id="header">Create Account</span>
                    <input id="email" placeholder="Email Address"></input>
                    <input id="username" placeholder="New Username"></input>
                    <input id="password" placeholder="New Password"></input>
                    <input id="confirm-password" placeholder="Confirm Password"></input>
                    <button onClick={handleRegister}>Create Account</button>
                    <span id='register-login' onClick={handleClick}>Already have an account? Log in</span>
                </Fragment>:
                <Fragment>
                    <span id='header'>Login</span>
                    <input id='username' placeholder="Enter Username"></input>
                    <div id="password-wrapper">
                        <input id="password" type={visibility? 'text':'password'} placeholder="Enter Password"></input>
                        <span className="material-symbols-outlined" id="visibility" onClick={handleVisibility}>{visibility? 'visibility':'visibility_off'}</span>
                    </div>
                    <button onClick={handleLogin} onSubmit={handleLogin}>Login</button>
                    <span id="register-login" onClick={handleClick}>New user? Create an account</span>
                </Fragment>
            }
            {gotError?
                <div id="login-error">
                    <span className="material-symbols-outlined" id="error-icon">error</span>
                    <span>{gotError.message}</span>
                </div>:
                null
            }
        </div>
    )
}

export default Login;