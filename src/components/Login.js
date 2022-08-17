import React, { Fragment, useState } from "react";

import '../style/Login.css';

import { register, login } from "../axios-services";

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    const handleClick = async (event) => {
        event.preventDefault();
        setIsRegistering(!isRegistering);
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        const newUser = {
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }
        await register(newUser)
        .then((result) => {console.log(result)})
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        await login(username, password)
        .then((result) => {setCurrentUser(result.data)})
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
                    <input id="password" placeholder="Enter Password"></input>
                    <button onClick={handleLogin}>Login</button>
                    <span id="register-login" onClick={handleClick}>New user? Create an account</span>
                </Fragment>
            }
        </div>
    )
}

export default Login;