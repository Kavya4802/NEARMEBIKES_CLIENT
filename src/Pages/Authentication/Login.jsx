import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Navbar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import "./login.css";
import { storeInSession } from "./Session";
import { useLocation } from 'react-router';
function Login() {
    const { id } = useParams();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    function handleClick(e) {
        e.preventDefault();
        const source = location.state ? location.state.source : "navbar";
    
        fetch("http://localhost:5000/login", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            pwd,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data, "userRegister");
            if (data.status === "ok") {
              alert("Login successful");
              storeInSession("user",JSON.stringify(data));
              if (data.role === "admin") {
                window.localStorage.setItem("token", data.data);
                navigate('/Dashboard');
                // window.localStorage.removeItem("token");
              } else {
                window.localStorage.setItem("token", data.data);
    
                if (source === "bookNow") {
                  const redirectPath = localStorage.getItem("redirectPath");
                  if (redirectPath) {
                    localStorage.removeItem("redirectPath");
                  navigate(redirectPath);
                  } else {
                  navigate(`/payment/${id}`);
                  }
                } else {
                navigate(id !== "undefined" ? '/' : '/');
                }
              }
            } else {
              alert("Invalid Username or Password");
            }
          });
      }

    return (
        <div className="login-parent">
            <Navbar />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className="login">
                <div>
                    <img src="https://images.unsplash.com/photo-1656420731047-3eb41c9d1dee?ixlib=rb-4.0.3&i
             xid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=8" alt=""></img>
                </div>
                <div className='text-left p-45'>
                    <form className="login-form p-5">
                        <h1>Login</h1>
                        <label>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                        <button className="btn1" onClick={handleClick}>Login</button>
                        <p style={{ color: "black", display:"flex", alignItems : "center", justifyContent : "center" }}>Don't have an account? <span><Link to="/register" className="login-btn">Signup</Link></span></p>
                        <p style={{ color: "black", fontWeight: "bold" }}>Forgot Password <span><Link to="/password-reset">click here</Link></span></p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;
