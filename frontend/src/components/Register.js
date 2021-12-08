import React from 'react';
import {Link} from 'react-router-dom';
import './Components.css';
import {useState} from 'react';

function RegisterForm(){

    const {userName, setUserName} = useState('')
    const {password, setPassword} = useState('')
    const {email, setEmail} = useState('')
    const handleSubmit = (value)=>{
        value.preventDefault()

        const user ={
            userName: userName,
            password: password,
            email: email
        }

        try{
                fetch("http://localhost:8081/api/auth/signup", {
                    method: "POST",
                    body: JSON.stringify({
                    title: "Title of post",
                    body: "Post Body"
                    })
                })
                    .then(res => {
                    if (!response.ok) throw Error(response.statusText);
                    return response.json();
                    })
                    .then(data => console.log(data, "Regiter on tehtud"))
                    .catch(error => console.log(error));
        }

    }


    return(
        <body>
        <div className="OuterContainer">

            <form className="InnerContainer" onSubmit={handleSubmit}>
            <div className="TitleBackround">
                <h1 className="Titel">Register</h1>
            </div>

            <div className="Input">
                <input
                    type="Text"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                ></input>
            </div>

            <div className="Input">
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>
            </div>

            <div className="Input">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    minLength="6"
                ></input>
            </div>

            <div className="Input">
                <input
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    email
                ></input>
            </div>
            
            <div className="Register">
                <button classname="Register"> Registreeri 🤷‍♀️</button>
            </div>

            <div className="ToLogin">
                <Link to="./login">
                    <button classname="ToLogin"> Logi sisse </button> 
                </Link>
            </div>

            </form>
        </div>
        </body>
        
    )
}
export default RegisterForm