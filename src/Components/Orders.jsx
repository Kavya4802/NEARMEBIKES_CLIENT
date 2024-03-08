import React, { useEffect, useState } from 'react';
import Navbar from './NavBar/NavBar';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';  // Import jsPDF
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import './orders.css';
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
          const logoImage = watermarkImage;
          doc.addImage(logoImage, 'PNG', 20, 10, 40, 30);
          doc.setFont('times', 'bold');
          doc.setTextColor(40);
          const titleWidth = 50; 
          const titleX = doc.internal.pageSize.getWidth() - titleWidth - 20; 
          const titleY = 20; 
         doc.setFontSize(36);
          doc.text('Invoice', titleX, titleY);
         
          doc.setFontSize(12);
          
          
  
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(50);
          const addx = doc.internal.pageSize.getWidth() - titleWidth - 20;
          const userDetailsX = 20; 
          const userDetailsY = 10 + 40 + 15; 
          doc.text(`BILLED TO`, userDetailsX, userDetailsY);
          doc.text(` ${order.userName}`, userDetailsX, userDetailsY + 10);
          doc.text(` ${order.phoneNumber}`, userDetailsX, userDetailsY + 20);
          doc.text(` ${order.userEmail}`, userDetailsX, userDetailsY + 30);
          doc.text("09th March 2024", addx, userDetailsY+10 );
          doc.text('Visakapatnam', addx, userDetailsY + 20);
         
          doc.setLineWidth(0.5);
          doc.line(20, userDetailsY + 40, doc.internal.pageSize.getWidth() - 20, userDetailsY + 40);
  
          const orderDetailsX = userDetailsX ; 
          const orderDetailsY = userDetailsY + 50; 
  
        
          const headers = [["Detail", "Value"]];
  
          
          const data = [
              ["Bike Name", order.bikeName],
              ["Price", order.amount],
              ["Bike booked on", order.startDate],
              ["Order-id", order.orderId]
          ];
  
          doc.autoTable({
            startY: orderDetailsY,
            head: headers,
            body: data,
            styles: { fillColor: [240, 240, 240], lineColor: [200, 200, 200], lineWidth: 0.5 },
            columnStyles: { 0: { fillColor: [200, 200, 200], textColor: [50, 50, 50] } }, // Specify styles for the first column
            headStyles: { fillColor: [180, 180, 180] }
        });
        
  
          doc.setFont('helvetica', 'bold');
         
          doc.setTextColor(0, 128, 0);
       
          doc.text("The Total Amount (INR) For Your Order  is " + order.amount,orderDetailsX,orderDetailsY+60 );
          
          doc.setFontSize(10);
          doc.setTextColor(100);
          doc.text("Thank You For Choosing Near Me Bikes!", 20, doc.internal.pageSize.getHeight() - 20);
          doc.text("For any queries or feedback, please contact us at nearmebikes@gmail.com or +91-1234567890", 20, doc.internal.pageSize.getHeight() - 10);

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
              <br></br>
            {orders.length === 0 ? (
              <p className="no-orders-message">No orders found.</p>
            ) : (
              <div className="orders-container">
                {orders.map((order) => (
                  <div key={order._id} className="order-item">
                    <div className="order-details">
                      <p>Order ID: {order.orderId}</p>
                      <p>Amount: {order.amount}</p>
                      <p>BikeName: {order.bikeName}</p>
                      <p>startDate: {order.startDate}</p>
                      <p>End Date: {order.endDate}</p>
                      <button onClick={() => generateInvoice(order)}>Get Invoice</button>
                    </div>
      
                    <div className="order-image">
                      <img src={`http://localhost:5000/images/${order.bikePicture}`} alt="Bike Image" />
                      </div>
                      <div className='order-star'>
                      <StarRating
                        bikeId={order.bikeId}
                        userEmail={order.userEmail} 
                        onChange={(rating) => handleRatingChange(order.bikeId, rating)}
                      />
                      
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
      
      

    };

export default Orders;
