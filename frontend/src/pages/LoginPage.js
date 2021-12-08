import React from 'react';
import './Pages.css';
import LoginForm from '../components/LoginForm.js'

function LoginPage(){
    return(
        <div className="Container">
            <div className="LoginForm">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage