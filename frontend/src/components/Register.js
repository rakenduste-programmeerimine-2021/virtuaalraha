import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (value) => {
    setErrorMsg("");

    value.preventDefault();

    const user = {
      firstName: firstName,
      password: password,
      email: email,
    };
    console.log(user);

    try {
      axios
        .post("http://localhost:8081/api/auth/signup", user)
        .then((res) => {
          console.log(res.data);
          if (res) {
            console.log("User registered successfully!");
          } 
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit}>
        <div >
          <p >Registration</p>
          {<span style={{ color: "red" }}>{errorMsg}</span>}
        </div>

        <div style = {{marginBottom: "10px"}}>
          <label style={{marginRight: "10px"}}>First name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Example"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div style = {{marginBottom: "10px"}}>
          <label style={{marginRight: "40px"}}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            email
          />
        </div>
        <div style = {{marginBottom: "10px"}}>
          <label style={{marginRight: "16px"}}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />
        </div>
        <div style = {{marginBottom: "10px"}}>
          <label>Confirm password</label>
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm password"
            required
          />
        </div>
        <div style = {{marginBottom: "10px"}}>
          <div style={{marginLeft: "30px"}}>
            <Link to="/login">
              <button style={{marginLeft: "10px"}}>Back</button>
            </Link>
            <input
              type="submit"
              value="Register"
              style={{marginLeft: "20px"}}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default RegisterForm;
