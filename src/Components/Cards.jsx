// Cards.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./Components.css";

function Cards({ user }) {
    const [cartCount, setCartCount] = useState(0);
    const [bikes, setBikes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBikeData();
    }, []);

    const fetchBikeData = async () => {
        try {
            const response = await fetch("http://localhost:5000/getbikes");
            const bikeData = await response.json();

            if (bikeData.status === "ok") {
                const transactionsResponse = await fetch("http://localhost:5000/api/transactions");
                const transactions = await transactionsResponse.json();

                // Combine bike data with transaction data
                const updatedBikes = bikeData.bikes.map((bike) => {
                    const transaction = transactions.find((t) => t.bikeId === bike._id);
                    return { ...bike, returned: transaction ? transaction.returned : true };
                });

                setBikes(updatedBikes);
            } else {
                console.log("Error fetching bikes");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const BookNowClick = async (bikeId, returned) => {
        try {
            if (!user) {
                // If not logged in, redirect to the login page
                navigate("/login", { state: { source: "bookNow" } });

                // Save the current path to local storage
                localStorage.setItem("redirectPath", `/payment/${bikeId}`);
            } else {
                // If logged in and the bike is returned, redirect to the payment page
                if (returned) {
                    navigate(`/payment/${bikeId}`);
                } else {
                    // Bike is not returned, show a message or handle as needed
                    alert("This bike is not available for booking as it is not returned.");
                }
            }
        } catch (error) {
            console.error("Error navigating:", error);
        }
    };

    const addToCart = async (bikeId) => {
        try {
            if (!user) {
                // If not logged in, redirect to the login page
                navigate("/login");

                // Save the current path to local storage
                localStorage.setItem("redirectPath", `/payment/${bikeId}`);
                return;
            }

            const response = await fetch(`http://localhost:5000/addtocart/${bikeId}/${user.email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                setCartCount(cartCount + 1);
                alert("Added to cart successfully");
            } else {
                alert("Sorry! Couldn't add to cart");
                const errorData = await response.json();
                console.error("Error adding item to cart:", errorData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Row md={3} xs={1} className="card-container">
                {bikes.map((bike) => (
                    <Col md={3} key={bike._id} >
                        <Card className={`card ${!bike.returned ? "not-returned" : ""} card`}>
                            <Card.Img
                                variant="top"
                                src={`http://localhost:5000/images/${bike.picture}`}
                                className="card-img"
                                alt={bike.brand}
                            />
                            <Card.Body>
                                <div className="card-header">
                                    <Card.Title style={{ fontFamily: "Muli,san-serif" }}><h4 style={{textTransform:"capitalize"}}>{bike.brand}</h4></Card.Title>
                                    <Card.Text className="card-price">
                                        <span className="currency-symbol">₹</span>
                                        <h4 style={{display:"inline"}}>{bike.price}</h4>
                                    </Card.Text>
                                </div>
                                <div className="card-buttons">

                                    <span>
                                        <Button
                                            variant="primary"
                                            className="book-now-button"
                                            onClick={() => BookNowClick(bike._id, bike.returned)}
                                            disabled={!bike.returned}
                                        >
                                            Book Now
                                        </Button>
                                    </span>
                                    <Button variant="primary" className="add-to-cart" onClick={() => addToCart(bike._id)} disabled={!bike.returned} >
                                        Add to Cart
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Cards;
