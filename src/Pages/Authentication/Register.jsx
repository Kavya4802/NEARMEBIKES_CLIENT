import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { Row, Col, Form, Input } from "antd";
import { storeInSession } from "./Session";
import { useLocation } from "react-router";
function Register() {
  const { id } = useParams();
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [pwd, setPwd] = useState(" ");
  const [no, setNo] = useState(" ");
  const [add, setAdd] = useState(" ");
  const [city, setCity] = useState(" ");
  const [pincode, setPin] = useState(" ");
  const location = useLocation();
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    const source = location.state ? location.state.source : "navbar";

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        pwd,
        no,
        add,
        city,
        pincode,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        storeInSession("user", JSON.stringify(res));
        return res.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          alert("Registered successfully");
          if (source === "bookNow") {
            const redirectPath = localStorage.getItem("redirectPath");
            if (redirectPath) {
              localStorage.removeItem("redirectPath");
              navigate(redirectPath);
            } else {
              navigate(`/payment/${id}`);
            }
          } else {
            navigate(id !== "undefined" ? "/" : "/");
          }
        } else {
          alert(data.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Error during form submission:", error);
        alert("Rules don't match");
      });
  }

  return (
    <div>
      <Navbar />
      <div className="signup">
          <div>
            {
              <img
                src="https://images.unsplash.com/photo-1656420731047-3eb41c9d1dee?ixlib=rb-4.0.3&i xid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80"
                alt=""
                className="signup-pic"
              ></img>
            }
          </div>
          <div className="col-lg-8">
            <form className="login-form" layout="vertical">
              <h1>Register</h1>
              <hr />
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="no">Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="no"
                  pattern="[0-9]+"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="add">Address</label>
                <input type="text" className="form-control" id="add" required />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  pattern="[0-9]+"
                  required
                />
              </div>
              <button className="btn1" onClick={handleClick}>
                Submit
              </button>
              <br />
              <br />
              <p style={{ color: "black", display:"flex", alignItems:"center",justifyContent:"center" }}>
                Already registered?
                <span>
                  <a className="login-btn" href={`/login/${id}`}>Login</a>
                </span>
              </p>
            </form>
            <Footer />
          </div>
      </div>
    </div>
  );
}

export default Register;