import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function Updates() {
    const { bikeId } = useParams();
    const [bikes, setBikes] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/getbikes")
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "ok") {
                    setBikes(data.bikes);
                    // console.log(data.bikes);
                } else {
                    console.log("Error fetching bikes");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const [bike, setBike] = useState({
        brand: "",
        model: "",
        price: "",
        picture: "",
    });

    const handleChange = (e) => {
        setBike({
            ...bike,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileUpload = (e) => {
        setBike({
            ...bike,
            picture: e.target.files[0],
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("brand", bike.brand);
            formData.append("model", bike.model);
            formData.append("price", bike.price);
            formData.append("picture", bike.picture);

            const response = await axios.put(
                `http://localhost:5000/bikesinfo/${bikeId}`,
                formData
            );
            if (!response.data.error) {
                alert("Bike updated successfully!");
            } else {
                alert("Error updating bike");
            }
        } catch (error) {
            console.error("Error updating bike:", error);
        }
    }
    return (
        <>
            <div className="desktop">
                <div className="overlap-group-wrapper">
                    <div className="overlap-group">
                        <img
                            className="rectangle"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bca6f91d18552ae4faf57c/img/rectangle-1.svg"
                        />
                        <img
                            className="img"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bbcbfb1d18552ae4faf221/img/rectangle-2.png"
                        />
                        <div className="text-wrapper">NEAR ME</div>
                        <img
                            className="rectangle-2"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bca6f91d18552ae4faf57c/img/rectangle-3.svg"
                        />
                        <img
                            className="line"
                            alt="Line"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bca6f91d18552ae4faf57c/img/line-3.svg"
                        />
                        <img
                            className="rectangle-3"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bca6f91d18552ae4faf57c/img/rectangle-4.svg"
                        />
                        <img
                            className="line-2"
                            alt="Line"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bca6f91d18552ae4faf57c/img/line-1.svg"
                        />
                        <img
                            className="line"
                            alt="Line"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bca6f91d18552ae4faf57c/img/line-1.svg"
                        />
                        <img
                            className="line-3"
                            alt="Line"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bca6f91d18552ae4faf57c/img/line-4.svg"
                        />
                        <img
                            className="line-4"
                            alt="Line"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bca6f91d18552ae4faf57c/img/line-1.svg"
                        />
                        <Link to="/" className="div">
                            Logout
                        </Link>
                        <Link to="/addbike" className="text-wrapper-2">
                            Add Bikes
                        </Link>
                        <Link to="/viewbike" className="text-wrapper-4">
                            View Bikes
                        </Link>
                        <Link to="/viewuser" className="text-wrapper-3">
                            Available Users
                        </Link>
                        <Link to="/Dashboard" className="text-wrapper-5">
                            Dashboard
                        </Link>
                        <div className="text-wrapper-6">Nearme Bikes</div>
                        <p className="p">Hit the road in style with your wheels</p>
                        <img
                            className="rectangle-4"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bbe0dc7baf1f6eab2a7de0/img/rectangle-5.png"
                        />
                        <img
                            className="rectangle-5"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bbe0dc7baf1f6eab2a7de0/img/rectangle-6.png"
                        />
                        <img
                            className="rectangle-6"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bbe0dc7baf1f6eab2a7de0/img/rectangle-7.png"
                        />
                        <div className="text-wrapper-7">Follow us on at:</div>
                        <div className="text-wrapper-8">facebook.rabbani</div>
                        <div className="text-wrapper-9">instagram.rabbani</div>
                        <div className="text-wrapper-10">twitter.rabbani</div>
                        <div className="text-wrapper-11">9121314151</div>
                        <div className="text-wrapper-12">rabbani456@gmail.com</div>
                        <div className="text-wrapper-13">Others</div>
                        <div className="text-wrapper-14">About us</div>
                        <div className="terms-conditions">Terms &amp;conditions</div>
                        <div className="text-wrapper-15">Privacy policy</div>
                        <img
                            className="rectangle-7"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bca6f91d18552ae4faf57c/img/rectangle-10.png"
                        />
                        <img
                            className="rectangle-8"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bbe0dc7baf1f6eab2a7de0/img/rectangle-8.png"
                        />
                        <img
                            className="rectangle-9"
                            alt="Rectangle"
                            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bbe0dc7baf1f6eab2a7de0/img/rectangle-9.png"
                        />
                        <div className="text-wrapper-16">
                            <h3>Update Bikes here</h3>
                            <br></br>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="1" style={{ fontSize: "15px" }}>
                                        Brand
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control style={{ width: "350px", marginLeft: "28px" }}
                                            type="text"
                                            placeholder="Enter brand"
                                            name="brand"
                                            value={bike.brand}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="formPlaintextPassword"
                                >
                                    <Form.Label column sm="1" style={{ fontSize: "15px" }}>
                                        Model
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control style={{ width: "350px", marginLeft: "28px" }}
                                            type="text"
                                            placeholder="Enter Bike Model"
                                            name="model"
                                            value={bike.model}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="formPlaintextPassword"
                                >
                                    <Form.Label column sm="1" style={{ fontSize: "15px" }}>
                                        Bike Rent
                                    </Form.Label>
                                    <Col sm="3">
                                        <Form.Control style={{ width: "350px", marginLeft: "28px" }}
                                            type="text"
                                            placeholder="Enter Bike Rent"
                                            name="price"
                                            value={bike.price}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>

                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="formPlaintextPassword"
                                >
                                    <Form.Label column sm="1" style={{ fontSize: "15px" }}>
                                        Picture
                                    </Form.Label>
                                    <Col sm="3" >
                                        <input type="file" onChange={handleFileUpload} style={{ width: "350px", marginLeft: "28px" }} />
                                    </Col>
                                </Form.Group>
                                <Button type="submit" variant="dark">
                                    Update
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};
export default Updates;
