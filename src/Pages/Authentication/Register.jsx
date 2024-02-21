import React, { useState } from "react";
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import "./register.css";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { storeInSession } from "../Session";


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
                storeInSession("user", JSON.stringify(res));
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
        <>
            <Navbar />
            <div className="signup">
                <Row gutter={16}>
                    <Col lg={16} style={{ position: "relative" }}>
                        {
                            <img
                                src="https://images.unsplash.com/photo-1656420731047-3eb41c9d1dee?ixlib=rb-4.0.3&i xid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80"
                                alt=""
                            ></img>
                        }
                    </Col>
                    <Col lg={8} className="text-left p-45">
                        <Form layout="vertical" className="login-form p-5">
                            <h1>Register</h1>
                            <hr></hr>
                            <Form.Item name="name" label="Name"
                                rules={[{ required: true, message: "Please enter your name" },
                                {
                                    pattern: /^[a-zA-Z]+$/,
                                    message: "Name must contain only letters",
                                },]}>
                                <Input onChange={(e) => setName(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: "Please enter a valid email address" },
                                    { type: "email", message: "Please enter a valid email address" },
                                ]}
                            >
                                <Input onChange={(e) => setEmail(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: "Please enter your password" },
                                    { min: 8, message: "Password must be at least 8 characters long" },
                                    {
                                        pattern: '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$',
                                        message:
                                            "Password must contain at least one capital letter, one number, and one symbol",
                                    }
                                    ,
                                ]}
                            >
                                <Input type="password" onChange={(e) => setPwd(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                name="no"
                                label="Number"
                                rules={[
                                    {
                                        pattern: /^[0-9\b]+$/,
                                        message: "Please enter a valid phone number",
                                    },
                                    { len: 10, message: "Phone number must be 10 digits long" },
                                ]}
                            >
                                <Input onChange={(e) => setNo(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="add" label="Address" rules={[{ required: true }]}>
                                <Input onChange={(e) => setAdd(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="city" label="City" rules={[{ required: true }]}>
                                <Input onChange={(e) => setCity(e.target.value)} />
                            </Form.Item>
                            <Form.Item name="pincode" label="Pincode"
                                rules={[{
                                    pattern: /^[0-9\b]+$/,
                                    message: "Please enter a valid pin code",
                                },
                                { len: 6, message: "Phone number must be 6 digits long" },]}>
                                <Input onChange={(e) => setPin(e.target.value)} />
                            </Form.Item>
                            <button className="btn1" onClick={handleClick}>
                                Submit
                            </button>
                            <br></br>
                            <br></br>
                            <p style={{ color: "white" }}>
                                Already registered?<span><Link to={`/login/${id}`}>Login</Link></span>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
}

export default Register;


