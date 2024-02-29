import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import './HandlePassword.css';


const ForgotPassword = () => {

    const {id,tokens} = useParams();

    const history = useNavigate();

    const [password,setpassword] = useState("");

    const [message,setMessage] = useState("");

    const userValid = async()=> {
        const res = await fetch(`http://localhost:5000/forgotpassword/${id}/${tokens}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data = await res.json()

        if(data.status == 201){
            console.log("user valid")
        }else{
            history("*")
        }
    }
        const setVal = (e)=>{
            setpassword(e.target.value)
        }

        const sendpassword = async(e) =>{
            e.preventDefault();
            const res = await fetch(`http://localhost:5000/resetpassword/${id}/${tokens}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({password})
            });

            const data = await res.json()

            if(data.status == 201){
                setpassword("");
                setMessage(true)

            }else{
                toast.error("! token Expired generate")
            }


        }

    useEffect(() => {
        userValid()
    },[])
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
                <h1>Enter your New Password</h1>

                {message ? <p style={{ color: "white", fontWeight: "bold" }}> Password updated</p>: " "}

                <hr></hr>
                    <Form.Item name='password' label='New Password' rules={[{required:true}]}  onChange={(setVal)}>
                    <Input type="password"></Input>
                    </Form.Item>
                    { <button className="btn" onClick={sendpassword}>Submit</button> }
                </Form>
                
            </Col>
           </Row>
        </div>
        <Footer></Footer>
        <ToastContainer />
    </>
  )
}

export default ForgotPassword