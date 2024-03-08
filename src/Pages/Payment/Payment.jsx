// Payment.js
import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import "./Payment.css";
import Navbar from "../../Components/NavBar/NavBar";
// import DatePicker from "react-datepicker";
import Footer from "../../Components/Footer/Footer";
import { Card } from 'react-bootstrap'; 
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Datetime from "react-datetime";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import watermark from "../../Components/watermark.png";
import CryptoJS from "crypto-js";
const Payment = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState([]);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bikeData, setBikeData] = useState([]);
  const [rating, setRating] = useState(null);
  const [showCongratulationsPopup, setShowCongratulationsPopup] =
    useState(false);
  const navigate = useNavigate();
  const toggleCongratulationsPopup = () => {
    setShowCongratulationsPopup(!showCongratulationsPopup);
  };
  // Function to toggle the visibility of the terms and conditions popup
  const toggleTermsPopup = () => {
    setShowTermsPopup(!showTermsPopup);
  };
  const [ratings, setRatings] = useState([]);
useEffect(() => {
  console.log("Image Source:", bikeData.picture);
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("http://localhost:5000/getusers", {
          headers: {
            Authorization: token,
          },
        });
        const data = await response.json();

        if (data.status === "ok") {
          setUser(data.user);

          // Find the rating for the specific bikeId
          const fetchedRating = ratings.find((r) => r.bikeId === bikeData._id);

          if (fetchedRating) {
            setRating(fetchedRating);
            console.log("lkhgf:",rating);
          } else {
            console.log("Bike rating not found");
          }
        } else {
          console.log("Error fetching user details");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setUser(null);
    }
  };

  fetchUserDetails();
}, [bikeData._id, ratings]);
useEffect(() => {
  const fetchRatings = async () => {
    try {
      const response = await fetch("http://localhost:5000/bike-ratings");
      const ratingData = await response.json();

      if (ratingData.status === "ok") {
        setRatings(ratingData.ratings);
      } else {
        console.log("Error fetching bike ratings");
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchRatings();
}, []);

  const handleAcceptTermsChange = () => {
    setAcceptTerms(!acceptTerms);
  };
  const handleDateChange = (date) => {
    setStartDate(date);
  };
  const endDateChange = (date) => {
    setEndDate(date);
  };
  function toggleTerms() {
    toggleTermsPopup();
  }
  async function displayRazorPay() {
    toggleTermsPopup();
    const durationPrice = calculateTotalPrice();
    const data = await fetch("http://localhost:5000/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bikeId: id,
        totalPrice: durationPrice.totalPrice,
      }),
    }).then((response) => response.json());
    //  console.log(data)
    const options = {
      key: "rzp_test_6YWgCz8B9XBA7M",
      currency: data.currency,
      amount: data.amount,
      description: "Wallet Transaction",
      order_id: data.id,
      handler: async function (response) {
        alert("PAYMENT ID:" + response.razorpay_payment_id);
        alert("ORDER ID:" + response.razorpay_order_id);
        setPaymentSuccess(true);
        const saveTransactionData = {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          userName: user.name,
          userEmail: user.email,
          amount: durationPrice.totalPrice,
          phoneNumber: user.no,
          startDate: startDate.toISOString(), // Convert to ISO format for consistency
          endDate: endDate.toISOString(),
          bikeId: bikeData._id,
          bikeName: bikeData.brand,
          bikePicture:bikeData.picture
        };
        try {
          await fetch("http://localhost:5000/save-transaction", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(saveTransactionData),
          });
        } catch (error) {
          console.error("Error saving transaction:", error);
          // Handle the error as needed
        }
        toggleCongratulationsPopup();
      },
      prefill: {
        name: "KAVYA",
        email: "hello@123.com",
        contact: "7883738988",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  // const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();
  
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/bikes/${id}`, {
      method: "GET",


    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data); // add this line
        setBikeData(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  // if (!bikeData) {
  //   return <div>Loading...</div>;
  // }
  const calculateTotalPrice = () => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    if (isNaN(startDateTime) || isNaN(endDateTime)) {
      return { durationInHours: 0, totalPrice: 0 };
    }
    // Calculate the duration in hours
    const durationInHours = Math.ceil(
      (endDateTime - startDateTime) / (1000 * 60 * 60)
    );

    // Set a minimum booking duration of 12 hours
    const minBookingDuration = 12;

    // Calculate the total price based on the conditions
    const totalPrice =
      durationInHours < minBookingDuration
        ? Math.ceil(bikeData.price / 24) * minBookingDuration
        : durationInHours * Math.ceil(bikeData.price / 24);

    return { durationInHours, totalPrice };
  };
  return (
    <div>
    <Navbar />
    <div className="payment-parent">
   
    
  
      
      <div className="summary-card">
        <Card >
        <Card.Header style={{backgroundColor:"#ff8400"}}>
        <h1 style={{fontSize:"35px"}}>Summary</h1> </Card.Header>
        <div className="bike-date">
          <div className="bike-details-content">
       
            <Card.Img
              variant="top"
              src={`http://localhost:5000/images/${bikeData.picture}`}
              alt="Bike Image"
            />
            <p className="bike-details-content">
              <p className="bike-name">{bikeData.brand}</p>
              <p className="bike-price">
                ₹{Math.ceil(bikeData.price / 24)}/per hour
              </p>
              
            </p>
          </div>
          <div className="date-section">
           <div className="form-input">
        <label>Start Date & Time:</label>
        <Datetime
          value={startDate}
          inputProps={{ placeholder: "START DATE&TIME" }}
          dateFormat="DD/MM/YYYY"
          onChange={handleDateChange}
         
          isValidDate={(current) => current.isSameOrAfter(Datetime.moment(), 'day')}
        />
      </div>
      <div className="form-input">
        <label>End Date & Time:</label>
        <Datetime
          value={endDate}
          inputProps={{ placeholder: "END DATE&TIME" }}
          onChange={endDateChange}
          dateFormat="DD/MM/YYYY"
         
          isValidDate={(current) => current.isSameOrAfter(Datetime.moment(), 'day')}
        />
      </div>
      </div>
    </div>
    
        </Card>
        </div>
          <Card className="checkout-card">
            <Card.Body>
              <Card.Header className="checkout-card-header" style={{backgroundColor:"#ff8400"}}>
               <h1 style={{fontSize:"35px"}}> Checkout</h1>
              </Card.Header><br></br>
              <br></br>
              <Card.Text className="checkout-card-text">
                <b>Booking by</b>: {user && user.name}
              </Card.Text><br></br>
              <Card.Text className="checkout-card-text">
                <b>Email</b>: {user && user.email}
              </Card.Text><br></br>
              <Card.Text className="checkout-card-text">
                <b>Bike Brand</b>: {bikeData.brand}
              </Card.Text><br></br>
             
              <Card.Text className="checkout-card-text">
                <pre
                  style={{
                    display: "inline",
                    
                  }}
                >
                 <b>₹</b>
                </pre>
                {Math.ceil(bikeData.price / 24)}/per hour
              </Card.Text><br></br>

              <Card.Text className="checkout-card-text">
              <b>₹</b>
                {calculateTotalPrice().totalPrice}/ Total
                <br></br>
                <br></br>
                <p>
                  <b>You booked the bike for </b>{" "}
                  {calculateTotalPrice().durationInHours} hrs
                </p>
                {calculateTotalPrice().durationInHours < 12
                  ? " (Minimum 12hr booking required)"
                  : ""}
              </Card.Text><br></br>

              <Button
                variant="primary"
                className="paynow-button"
                onClick={() => setShowTermsPopup(true)}
              >
                Pay Now
              </Button><br></br>
            </Card.Body>
          </Card>
        
        {showTermsPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* Your Terms and Conditions popup content */}
            <div className="accept-terms-container">
              <label>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={handleAcceptTermsChange}
                />
                I accept the Terms and Conditions
              </label><br></br>
            </div>
            <div className="button-container">
            <br></br>
              <button
                className={`proceed-button ${acceptTerms ? "green" : "grey"}`}
                onClick={() => {
                  displayRazorPay();
                  setShowTermsPopup(false);
                }}
                disabled={!acceptTerms}
              >
                Proceed
              </button>
              <button className="close-button" onClick={() => setShowTermsPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCongratulationsPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            {/* Your Congratulations popup content */}
            <h2>Congratulations!</h2>
            <p>Your order has been successfully placed.</p>
            <br></br>
            <br></br>
            <Link
              to={`/orders/${encodeURIComponent(user.email)}`}
              className="close-button"
              onClick={() => setShowCongratulationsPopup(false)}
            >
              Close
            </Link>
          </div>
        </div>
        
      )}
      </div>
      <div className="rating-card">
      <Card className="rate-card">
      {rating && (
                <div>
                  <ul>
                  <Card.Header style={{backgroundColor:"#ff8400"}}>
                  <h1 style={{fontSize:"35px"}}>Reviews </h1></Card.Header>
                  <br></br>
                  <br></br>
                    {rating.userEmail.map((email, index) => (
                      <li key={index} className="review-item">
                      <b>  {email}</b>:{rating.description[index]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
        </Card>
      </div>
      <Footer />
      </div>
      
      
  );
      }
export default Payment;