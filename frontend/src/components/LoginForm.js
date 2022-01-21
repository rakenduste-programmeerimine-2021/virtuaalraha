import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../store";
import { loginUser } from "../store/actions";


function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (value) => {
    value.preventDefault();

    const user = {
      email: email,
      password: password,
      role: false,
    };

    try {
      axios
        .post("http://localhost:8081/api/auth/login", user)
        .then((res) => {
          console.log(res.data);
          if (res) {
            console.log("User sign-in successful!");
            console.log(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            dispatch(loginUser());
            navigate("/", { replace: true });
          } else {
            setErrorMsg("An user with this email does not exist!");
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg("An user with this email does not exist");
        });
    } catch (error) {
      console.error(error);
      setErrorMsg("An user with this email does not exist");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style = {{marginBottom: "20px"}}>
          <p >Login</p>
          {<span style={{ color: "red" }}>{errorMsg}</span>}
        </div>
        <div style = {{marginBottom: "20px"}}>
          <label style = {{marginRight: "30px"}}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            email
          />
        </div>
        <div style = {{marginBottom: "20px"}}>
          <label style = {{marginRight: "5px"}}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style = {{marginBottom: "20px"}}>
          <div style = {{marginLeft: "40px"}}>
            <Link to="/register">
              <button style = {{marginRight: "20px"}}>Register</button>
            </Link>
            <button >Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
