import React from "react";
import {Row,Col,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import "./ViewBikes.css";
function Viewbikes(){
    const [bikes, setBikes] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/getbikes')
          .then(response => response.json())
          .then(data => {
            if (data.status === 'ok') {
              setBikes(data.bikes);
              console.log(data.bikes);
            } else {
              console.log('Error fetching bikes');
            }
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
    return(
        <>
     <Row md={3}>
      {bikes.map(bike => (
        <Col md={3} >
        <Card className="card" >
        <Card.Img variant="top" src={`http://localhost:5000/images/${bike.picture}`} className="card-img" />
          <Card.Body>
          <Card.Title style={{fontWeight:"bold",fontSize:"25px"}}>{bike.brand}</Card.Title>
          <Card.Text><pre style={{display:"inline",fontSize: "24px",fontWeight:"bold"}}>₹</pre>{bike.price} </Card.Text>
          <marquee behavior="alternate" direction="right" scrollamount="5" style={{fontSize:"20px",color:"red"}} >{bike.status}</marquee>
            <Link to={`/register/${bike._id}`}>
            <Button variant="primary">Book Now</Button>
            </Link>
           </Card.Body>
        </Card>
        <hr></hr>
     
      </Col>
       
      ))}
      </Row>
      {/* <a href="upi://pay?pa=9618371248@ibl&pn=KAVYA&cu=INR&am=1" class="upi-pay1">Pay Now!</a> */}
      </> 
    ) 
}
export default Viewbikes;