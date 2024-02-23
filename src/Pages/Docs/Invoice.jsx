// Invoice.js

import React, { useContext } from 'react';
 import './Invoice.css'; // You can style the invoice with a CSS file
import db from '../../db.js';

 // Replace with the actual path to your UserContext

const Invoice = ({ ownerData, bikeData, paymentData }) => {
  const { userData } = useContext(db);

  if (!userData) {
    // Handle the case where user data is not available (not logged in)
    return <div>Loading...</div>;
  }

  const invoiceDetails = {
    ownerData,
    customerData: {
      name: userData.name,
      email: userData.email,
      no: userData.no,
    },
    bikeData,
    paymentData,
  };

  return (
    <div className="invoice-container">
      <h2>Invoice</h2>
      <div className="owner-details">
        <p>Owner: {ownerData.name}</p>
        <p>Email: {ownerData.email}</p>
        <p>Phone: {ownerData.no}</p>
      </div>
      <div className="customer-details">
        <p>Customer: {invoiceDetails.customerData.name}</p>
        <p>Email: {invoiceDetails.customerData.email}</p>
        <p>Phone: {invoiceDetails.customerData.no}</p>
      </div>
      <div className="bike-details">
        <p>Bike Brand: {bikeData.brand}</p>
        <p>Price: {bikeData.price}</p>
      </div>
      <div className="payment-details">
        <p>Payment ID: {paymentData.razorpay_payment_id}</p>
        <p>Order ID: {paymentData.razorpay_order_id}</p>
        {/* Add other payment details as needed */}
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export default Invoice;
