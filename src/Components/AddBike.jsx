import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Components.css";
import AdminFooter from './Footer/AdminFooter';
import AdminNavbar from './NavBar/AdminNavbar';
function AddBike(){
       const[brand,setBrand]=useState("");
       const[model,setModel]=useState("");
       const[price,setPrice]=useState("");
       const[status,setStatus]=useState("");
       const[picture,setPicture]=useState({myFile:"",bikeImg:null});
    
       function handleClick(e){
        e.preventDefault();
        const formData = new FormData()
        formData.append('bikeImg', picture.bikeImg)
        formData.append('formData', JSON.stringify({
          brand,
          model,
          price,
          status
          
      }))
      axios.post("http://localhost:5000/addbike", formData, {
          }).then(res => {
              console.log(res)
              alert("bike added succesfully")
          })
        // fetch("http://localhost:5000/addbike",{
        //     method:"POST",
        //     crossDomain:true,
        //     headers:{
        //         "Content-Type":"application/json",
        //         Accept:"application/json",
        //         "Access-control-Allow-Origin":"*"
        //     },
        //     body:JSON.stringify({
        //         brand,
        //         model,
        //         price,
        //         picture: picture.myFile
        //     }),
        // }).then((res)=>res.json())
        // .then((data)=>{
        //     // alert("inserted in database succesfully");
        //      console.log(data,"BikesInfo");
        // })

        }
      
       async function handleFileUpload(e){
             const file=e.target.files[0];
             const base64=await convertToBase64(file);
             setPicture({myFile:base64,bikeImg:e.target.files[0]})
        }
        return (
          <>
          <AdminNavbar></AdminNavbar>
          <AdminFooter />
          <div className='addbike-form'>
           <Form>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="1" style={{fontSize:"15px"}}>
                    Brand
                  </Form.Label>
                  <Col sm="3">
                    <Form.Control  style={{width:"350px",marginLeft:"25px"}}
                      type="text"
                      placeholder="Enter Bike Brand"
                      name="brand"
                      onChange={(e) => {
                        setBrand(e.target.value);
                      }}
                      className="addbike-form-control"
                    />
                  </Col>
                </Form.Group>
        
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="1" style={{fontSize:"15px"}}>
                    Model
                  </Form.Label>
                  <Col sm="3">
                    <Form.Control
                    style={{width:"350px",marginLeft:"25px"}}
                      type="text"
                      placeholder="Enter Bike Model"
                      name="model"
                      onChange={(e) => {
                        setModel(e.target.value);
                      }}
                      className="addbike-form-control"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="1" style={{fontSize:"15px"}}>
                    Bike Rent
                  </Form.Label>
                  <Col sm="3">
                    <Form.Control
                    style={{width:"350px",marginLeft:"25px"}}
                      type="text"
                      placeholder="Enter Bike Rent"
                      name="price"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      className="addbike-form-control"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="1" style={{fontSize:"15px"}}>
                    Status
                  </Form.Label>
                  <Col sm="3">
                    <Form.Control
                    style={{width:"350px",marginLeft:"25px"}}
                      type="text"
                      placeholder="Enter Status"
                      name="status"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      className="addbike-form-control"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="1" style={{fontSize:"14px"}}>
                    Picture
                  </Form.Label>
                  <Col sm="3">
                    <input
                    style={{width:"350px",marginLeft:"25px"}}
                      type="file"
                      onChange={handleFileUpload}
                      className="addbike-form-control"
                    />
                  </Col>
                </Form.Group>
              </Form>
              <Button variant="dark" onClick={handleClick}>
                Submit
              </Button>
              </div>
              
          </>
        );
        
}
export default AddBike;
function convertToBase64(file){
  return new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
      resolve(fileReader.result)
    };
    fileReader.onerror=(error)=>{
      reject(error)
    }
  })
}
