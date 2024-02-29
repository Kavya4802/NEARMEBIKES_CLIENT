import React, { useEffect, useState } from 'react';
import Navbar from './NavBar/NavBar';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';
import './Components.css';
import watermarkImage from './watermark.png'; // Update the path based on your project structure


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
        doc.setFont('times-new-roman' );
    
            // Add owner details
            doc.text(`Do No : 48-16-12,`, 120, 30);
            doc.text(`Sri Jaganadth Bhavan Asilmetta,`, 120, 40);
            doc.text(`beside HP Bunk, RTC Complex,`, 120, 50);
            doc.text(`Visakhapatnam, Andhra Pradesh`, 120, 60);
    
            // Add contact details
            doc.text('Mobile: 9087654321 ', 120, 70);
            doc.text('www.nearmebikes.in', 120, 80);
    
            // Invoice Details
            doc.text('Order Id: ' + order.orderId, 20, 100);
    
            doc.text(`ordered Date: ${order.startDate}`, 20, 40);
            doc.text(`Payment Date: ${order.endDate}`, 20, 50);
    
            // Bill To Details
            doc.text('BILL TO', 20, 140);
            doc.text(order.userName, 30, 150);
            doc.text(order.phoneNumber,30,160);
    
            // Items Details
            const startY = 160;
            let currentY = startY;
    
            // for (let item of order.items) {
            //     currentY += 10;
            //     const { description, count, totalPrice } = item;
            //     const pricePerItem = totalPrice / count;
            //     const line = `${description} ${count} ${pricePerItem.toFixed(2)} ${order.amount.toFixed(2)}`;
            //     doc.text(line, 20, currentY, { align: 'left' });
            // }
    
            // Total Amount Due Details
            doc.text("Total Amount Due (INR): " + order.amount.toFixed(2), 20, currentY + 30, { align: 'left' });
    
            // Save the PDF
            doc.save(`invoice_${order.orderId}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    
    

    return (
        <div>
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
                                {/* Add other order details as needed */}
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
