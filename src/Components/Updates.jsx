import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./update.css";

import { Link } from "react-router-dom";
import Navbar from "./NavBar/AdminNavbar";
import Footer from "./Footer/Footer";

function Updates() {
    const { bikeId } = useParams();
    const [bike, setBike] = useState({
        brand: "",
        model: "",
        price: "",
        picture: "",
    });

    useEffect(() => {
        fetch("http://localhost:5000/getbikes")
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "ok") {
                    setBike(data.bikes.find(b => b._id === bikeId) || {});
                } else {
                    console.log("Error fetching bikes");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [bikeId]);

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
    };

    return (
        <div className="update">
            <Navbar />
            <div>
            <br></br>
                <h3>Update Bikes here</h3>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="brand" style={{ fontSize: "15px" }}>
                            Brand
                        </label>
                        <input
                            type="text"
                            placeholder="Enter brand"
                            name="brand"
                            value={bike.brand}
                            onChange={handleChange}
                            
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="model" style={{ fontSize: "15px" }}>
                            Model
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Bike Model"
                            name="model"
                            value={bike.model}
                            onChange={handleChange}
                           
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" style={{ fontSize: "15px" }}>
                            Rent
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Bike Rent"
                            name="price"
                            value={bike.price}
                            onChange={handleChange}
                            
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="picture" style={{ fontSize: "15px" }}>
                            Picture
                        </label>
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            
                        />
                    </div>

                    <button type="submit" variant="dark" className="updates-button">
                        Update
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Updates;
