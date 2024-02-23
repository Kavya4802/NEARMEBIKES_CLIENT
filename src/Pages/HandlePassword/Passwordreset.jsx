import React, { useState } from "react";
import { Row, Col, Form, Input } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HandlePassword.css";
import Navbar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/sendpasswordlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.status === 201) {
      setEmail("");
      setMessage(true);
    } else {
      toast.error("Invalid User");
    }
  };
  return (
    <>
        <Navbar></Navbar>
        <meta name="viewport" content="width=device-width, initial-scale=1.o" />
        <div className="login">
       
           <Row gutter={16}>
            <Col lg={16} >
            <img src="https://images.unsplash.com/photo-1656420731047-3eb41c9d1dee?ixlib=rb-4.0.3&i
             xid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=8" alt=""></img>
            </Col>
            <Col lg={8} className='text-left p-45'>
                <Form layout='vertical' className="login-form p-5">
                <h1>Enter your Email</h1>

                {message ? <p style={{ color: "white", fontWeight: "bold" }}> Password reset link sent successfully to your email</p>: " "}

                <hr></hr>
                    <Form.Item name='email' label='Email' rules={[{required:true, type:'email'}]}  onChange={(setVal)}>
                        <Input></Input>
                    </Form.Item>
                    { <button className="btn" onClick={sendLink}>Send</button> }
                </Form>
                
            </Col>
           </Row>
        </div>
        <Footer></Footer>
        <ToastContainer />
        </>
  )
}

export default PasswordReset;