import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ViewBikes.css";
import AdminFooter from "../../../Components/Footer/AdminFooter";
import Navbar from "../../../Components/NavBar/AdminNavbar";

function ViewBike() {
  const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getbikes")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setBikes(data.bikes);
        } else {
          console.log("Error fetching bikes");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/bikesinfo/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          const updatedBikes = bikes.filter((bike) => bike.id !== id);
          alert("Deleted successfully");
          setBikes(updatedBikes);
          window.location.reload();
        } else {
          alert("Error deleting bike");
          console.log("Error deleting bike");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (id) => {
    navigate(`/bikeupdate/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="viewbikes-table">
        <br />
        <br />
        <main>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike, index) => (
                <tr key={bike.id}>
                  <td data-label="ID">{index + 1}</td>
                  <td data-label="Brand">{bike.brand}</td>
                  <td data-label="Model">{bike.model}</td>
                  <td data-label="Price">{bike.price}</td>
                  <td data-label="Status">{bike.status}</td>
                  <td data-label="Action">
                    <Link to={`/bikeupdate/${bike._id}`}>
                      <button
                        className="update-button"
                        onClick={() => handleUpdate(bike._id)}
                      >
                        Update
                      </button>
                    </Link>
                    <a href>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(bike._id)}
                      >
                        Delete
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      <AdminFooter />
    </>
  );
}

export default ViewBike;
