import React, { useEffect, useState } from 'react';
import Navbar from './NavBar/NavBar';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import './Components.css';
import watermarkImage from './watermark.png'; 
import StarRating from './Rating/StarRating';
const Orders = () => {
    const location = useLocation();
    const encodedUserEmail = location.pathname.split('/orders/')[1];
    const userEmail = decodeURIComponent(encodedUserEmail);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders based on the userEmail
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:5000/get-orders/${encodeURIComponent(userEmail)}`);
                const data = await response.json();

                if (data.status === 'ok') {
                    // Sort orders in descending order based on the startDate
                    const sortedOrders = data.orders.sort((a, b) => {
                        const dateA = new Date(a.startDate.split('/').reverse().join('/') + ' 12:00 AM').toLocaleDateString('en-US');
                        const dateB = new Date(b.startDate.split('/').reverse().join('/') + ' 12:00 AM').toLocaleDateString('en-US');
                        return new Date(dateB) - new Date(dateA);
                    });

                    setOrders(sortedOrders);
                } else {
                    console.log('Error fetching orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userEmail]);
    const generateInvoice = async (order, ownerData, customerData, bikeData, paymentData) => {
        try {
            const doc = new jsPDF();
            doc.addImage(watermarkImage, 'PNG', 20, 10, 40, 30);
            doc.setFontSize(30);
            doc.setFont('helvetica', 'bold');
            const titleWidth = 50; 
            const titleX = doc.internal.pageSize.getWidth() - titleWidth - 20; 
            const titleY = 20; 
    
            doc.text('Invoice', titleX, titleY);
    
            doc.setFontSize(12);
    
            const userDetailsX = 20; // Adjust the X-coordinate based on your design
            const userDetailsY = 10 + 40 + 15; // Adjust the Y-coordinate based on your design
            doc.text(`BILLED TO`, userDetailsX, userDetailsY);
            doc.text(` ${order.userName}`, userDetailsX, userDetailsY + 10);
            doc.text(` ${order.phoneNumber}`, userDetailsX, userDetailsY + 20);
            doc.text(` ${order.userEmail}`, userDetailsX, userDetailsY + 30);
    
            const orderDetailsX = userDetailsX + 115; // Keep it parallel to the user details
            const orderDetailsY = userDetailsY; // Adjust the Y-coordinate based on your design
            doc.text(`${order.orderId}`, orderDetailsX, orderDetailsY);
            doc.text(` ${order.startDate}`, orderDetailsX, orderDetailsY + 10);
    
            // Create table from JSON data
            const data = [
                { "Bike Name": `${order.bikeName}`, "Price": order.amount.toFixed(2) }
            ];
    
            const tableX = 10;
            const tableY = userDetailsY + 50; // Adjust the Y-coordinate based on your design
            autoTable(doc, { head: [['Bike Name', 'Price']], body: data, startY: tableY });
    
            doc.text("Total Amount (INR): " + order.amount.toFixed(2), 10, tableY + 10, { align: 'left' });
    
            // Save the PDF
            doc.save(`invoice_${order.orderId}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    const handleRatingChange = (bikeId, rating) => {
        // Implement logic to update the rating in the database
        // You can use fetch or any other method to send the rating to your server
        console.log(`Order ID: ${bikeId}, Rating: ${rating}`);
    
        // Assuming you have a function to update the rating in the state
        // Update the rating in the state or perform any necessary actions
        // setOrders(updatedOrders);
      };
    

    return (
        <div className='orders-parent'>
            <Navbar />
            <div className="orders-page">
                <h2>Your Orders</h2>

                {orders.length === 0 ? (
                    <p className="no-orders-message">No orders found.</p>
                ) : (
                    <ul className="orders-list">
                        {orders.map((order) => (
                            <li key={order._id} className="order-item">
                                <p>Order ID: {order.orderId}</p>
                                <p>Amount: {order.amount}</p>
                                <p>BikeName: {order.bikeName}</p>
                                <p>startDate: {order.startDate}</p>
                                <p>End Date: {order.endDate}</p>
                                <img src={`http://localhost:5000/images/${order.bikePicture}`} alt="Bike Image"></img>
                                {/* Add other order details as needed */}
                                <StarRating
                                bikeId={order.bikeId}
                                userEmail={order.userEmail} 
                                onChange={(rating) => handleRatingChange(order.bikeId, rating)}
                />
                                <button onClick={() => generateInvoice(order)}>Get Invoice</button>

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Orders;
