import React, { useEffect, useState } from 'react';
import Navbar from './NavBar/NavBar';
import { useLocation } from 'react-router-dom';
import './Components.css';

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
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Orders;
