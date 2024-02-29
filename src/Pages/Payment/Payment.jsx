// Payment.js
import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import "./Payment.css";
import Navbar from "../../Components/NavBar/NavBar";
// import DatePicker from "react-datepicker";
import { Card } from 'react-bootstrap'; 
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Datetime from "react-datetime";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
const Payment = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState([]);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
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
  useEffect(() => {
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
  const [bikeData, setBikeData] = useState([]);
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
    <div className="payment-parent">
    <Navbar></Navbar>
    <div className="payment-page">
      {/* Summary Card */}
      <div className="summary-card">
        <Card>
          <Card.Header>Summary</Card.Header>
          <div className="bike-details-content">
            <Card.Img
              variant="top"
              src={`http://localhost:5000/images/${bikeData.picture}`}
              alt="Bike Image"
            />
            <div className="bike-details-content">
              <div className="bike-name">{bikeData.brand}</div>
              <div className="bike-price">
                ₹{Math.ceil(bikeData.price / 24)}/per hour
              </div>
              <div>
                <p>oiuyhxguycyshaiayhuiygfcgghui098uytgfhciuas</p>
                <p>iouygchsgdigffffffffffffffffffffffffffffff</p>
                <p>hyudsshavashgasiugfsgajdhsahfaaskha</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="important-card">
      <div className="date-card">
  <Card>
    <Card.Header>Date Selection</Card.Header>
    <div className="date-section">
      <div className="form-input">
        <label>Start Date & Time:</label>
        <Datetime
          value={startDate}
          inputProps={{ placeholder: "START DATE&TIME" }}
          dateFormat="DD/MM/YYYY"
          onChange={handleDateChange}
          // Set minDate to today
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
          // Set minDate to today
          isValidDate={(current) => current.isSameOrAfter(Datetime.moment(), 'day')}
        />
      </div>
    </div>
  </Card>
</div>

        {/* Checkout Card */}
        <div className="checkout-card">
          <Card>
            <Card.Body>
              <Card.Header className="checkout-card-header">
                Checkout
              </Card.Header>
              <Card.Text className="checkout-card-text">
                Booking by: {user && user.name}
              </Card.Text>
              <Card.Text className="checkout-card-text">
                Email: {user && user.email}
              </Card.Text>
              <Card.Text className="checkout-card-text">
                Bike Brand: {bikeData.brand}
              </Card.Text>

              <Card.Text className="checkout-card-text">
                <pre
                  style={{
                    display: "inline",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  ₹
                </pre>
                {Math.ceil(bikeData.price / 24)}/per hour
              </Card.Text>

              <Card.Text className="checkout-card-text">
                <span>₹</span>
                {calculateTotalPrice().totalPrice}/ Total
                <p>
                  You booked the bike for{" "}
                  {calculateTotalPrice().durationInHours} hrs
                </p>
                {calculateTotalPrice().durationInHours < 12
                  ? " (Minimum 12hr booking required)"
                  : ""}
              </Card.Text>

              <Button
                variant="primary"
                className="paynow-button"
                onClick={() => setShowTermsPopup(true)}
              >
                Pay Now
              </Button>
            </Card.Body>
          </Card>
        </div>
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
              </label>
            </div>
            <div className="button-container">
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
      </div>
       </div>
  );
      }
export default Payment;