import React, { Fragment, useState } from "react";

import '../style/Login.css';

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    const handleClick = async (event) => {
        event.preventDefault();
        setIsRegistering(!isRegistering);
    }

    return (
        <div id="login">
            {isRegistering?
                <Fragment>
                    <span id="header">Create Account</span>
                    <input id="username" placeholder="New Username"></input>
                    <input id="password" placeholder="New Password"></input>
                    <input id="confirm-password" placeholder="Confirm Password"></input>
                    <button>Create Account</button>
                    <span id='register-login' onClick={handleClick}>Already have an account? Log in</span>
                </Fragment>:
                <Fragment>
                    <span id='header'>Login</span>
                    <input id='username' placeholder="Enter Username"></input>
                    <input id="password" placeholder="Enter Password"></input>
                    <button>Login</button>
                    <span id="register-login" onClick={handleClick}>New user? Create an account</span>
                </Fragment>
            }
        </div>
    )
}

export default Login;