import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ViewBikes.css";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/NavBar/AdminNavbar";

function ViewBike() {
  const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = 5;
  const firstIndex = (currentPage - 1) * recordPerPage;
  const lastIndex = currentPage * recordPerPage;
  const records = bikes.slice(firstIndex, lastIndex);
  const npage = Math.ceil(bikes.length/ recordPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  function nextPage(){
    if(currentPage !== lastIndex){
      setCurrentPage(currentPage + 1);
    }
  
   }
   function prePage(){
   if(currentPage !== firstIndex){
     setCurrentPage(currentPage -1);
   }
   }
   function changeCPage(id){
    setCurrentPage(id)
   }

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
    <div className="par">
      <Navbar />
      <div className="viewbikes-container">
        <br />
        <h1>View Bikes / update Bike</h1>
        <main>
          <table className="viewbikes-table">
            <thead>
              <tr>
                <th style={{backgroundColor:"#ff8400"}}>ID</th>
                <th style={{backgroundColor:"#ff8400"}}>Brand</th>
                <th style={{backgroundColor:"#ff8400"}}>Model</th>
                <th style={{backgroundColor:"#ff8400"}}>Price</th>
                <th style={{backgroundColor:"#ff8400"}}>Status</th>
                <th style={{backgroundColor:"#ff8400"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((bike, index) => (
                <tr key={bike._id}>
                  <td data-label="ID">{firstIndex + index + 1}</td>
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
            <nav>
  <ul className="pag">
    <li className="pag-item">
      <button className="pag-link" onClick={prePage}>
        Prev
      </button>
    </li>
    {numbers.map((n, i) => (
      <li
        className={`pag-item ${currentPage === n ? "pag-active" : ""}`}
        key={i}
      >
        <button className="pag-link" onClick={() => changeCPage(n)}>
          {n}
        </button>
      </li>
    ))}
    <li className="pag-item">
      <button className="pag-link" onClick={nextPage}>
        Next
      </button>
    </li>
  </ul>
</nav>
          </table>
      
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ViewBike;
