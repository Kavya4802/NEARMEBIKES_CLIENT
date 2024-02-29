import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./register.css";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

function Register() {
    const { id } = useParams();
    const [name, setName] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [pwd, setPwd] = useState(" ");
    const [no, setNo] = useState(" ");
    const [add, setAdd] = useState(" ");
    const [city, setCity] = useState(" ");
    const [pincode, setPin] = useState(" ");

    function handleClick(e) {
        e.preventDefault();
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
                return res.json();
            })
            .then((data) => {
                if (data.status === "ok") {
                    alert("Registered successfully");
                    window.location.href = `/payment/${id}`;
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
        <div className="register-parent">
            <Navbar />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className="register">
            <div>
                    <img src="https://images.unsplash.com/photo-1656420731047-3eb41c9d1dee?ixlib=rb-4.0.3&i
             xid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=8" alt=""></img>
                </div>
                <div>
                <br></br>
                <br></br>
                <br></br>
                    <h1>Register</h1>
                    <hr></hr>
                    <label>Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                    <label>Email:</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} />
                    <label>Password:</label>
                    <input type="password" onChange={(e) => setPwd(e.target.value)} />
                    <label>Number:</label>
                    <input type="text" onChange={(e) => setNo(e.target.value)} />
                    <label>Address:</label>
                    <input type="text" onChange={(e) => setAdd(e.target.value)} />
                    <label>City:</label>
                    <input type="text" onChange={(e) => setCity(e.target.value)} />
                    <label>Pincode:</label>
                    <input type="text" onChange={(e) => setPin(e.target.value)} />
                    <button className="btn1" onClick={handleClick}>
                        Submit
                    </button>
                    <br></br>
                    <br></br>
                    <p style={{ color: "black" }}>
                        Already registered?<span><Link to={`/login/${id}`}>Login</Link></span>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
