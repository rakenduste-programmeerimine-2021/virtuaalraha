import RegisterForm from "../components/Register";
import React from 'react';
import './Pages.css'

function RegisterPage(){
    return(
        <div className="Container">
            <div className="RegisterForm">
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage