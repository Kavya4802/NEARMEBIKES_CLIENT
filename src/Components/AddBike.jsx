import { useState } from 'react';
import axios from 'axios';
import "./addbike.css";
import Footer from './Footer/Footer';
import AdminNavbar from './NavBar/AdminNavbar';

function AddBike() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
    const [picture, setPicture] = useState({ myFile: "", bikeImg: null });

    function handleClick(e) {
        e.preventDefault();
        const formData = new FormData()
        formData.append('bikeImg', picture.bikeImg)
        formData.append('formData', JSON.stringify({
            brand,
            model,
            price,
            status
        }))
        axios.post("http://localhost:5000/addbike", formData, {})
            .then(res => {
                console.log(res)
                alert("bike added succesfully")
            })
    }

    async function handleFileUpload(e) {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPicture({ myFile: base64, bikeImg: e.target.files[0] })
    }

    return (
        <div className='add'>
            <AdminNavbar></AdminNavbar>
            <div >
                <h1>Add Bikes Here </h1>
                <br></br>
                <form className='addbike-form'>
                    <div className="form-group">
                        <label htmlFor="brand" style={{ fontSize: "15px" }}>
                            Brand
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Bike Brand"
                            name="brand"
                            onChange={(e) => {
                                setBrand(e.target.value);
                            }}
                            className="addbike-form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="model" style={{ fontSize: "15px" }}>
                            Model
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Bike Model"
                            name="model"
                            onChange={(e) => {
                                setModel(e.target.value);
                            }}
                            className="addbike-form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price" style={{ fontSize: "15px" }}>
                            Bike Rent
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Bike Rent"
                            name="price"
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            className="addbike-form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status" style={{ fontSize: "15px" }}>
                            Status
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Status"
                            name="status"
                            onChange={(e) => {
                                setStatus(e.target.value);
                            }}
                            className="addbike-form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="picture" style={{ fontSize: "15px" }}>
                            Picture
                        </label>
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            className="addbike-form-control"
                        />
                    </div>

                    <button type="button" onClick={handleClick} className="addbike-button">
                        Submit
                    </button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default AddBike;

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}
