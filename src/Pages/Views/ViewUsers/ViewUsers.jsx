import "./ViewUsers.css";
import { useState, useEffect } from "react";


function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [buttonClicked, setButtonClicked] = useState({});

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch("http://localhost:5000/api/transactions")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleReturnedClick = async (index) => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateReturnedStatus/${users[index]._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ returned: true }),
      });

      if (response.ok) {
        setButtonClicked({ ...buttonClicked, [index]: true });
      } else {
        console.error("Error updating returned status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating returned status:", error);
    }
  };

  const handleNotReturnedClick = async (index) => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateReturnedStatus/${users[index]._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ returned: false }),
      });

      if (response.ok) {
        setButtonClicked({ ...buttonClicked, [index]: false });
      } else {
        console.error("Error updating returned status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating returned status:", error);
    }
  };

  return (
    <>
      <div className="desktop">
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            
            <div className="text-wrapper-16">
            <div className="viewusers-container">
      <h3>Orders received</h3>
      <br />
      <br />
      <main className="viewusers-main">
        <table className="viewusers-table">
          <thead className="viewusers-thead">
            <tr>
              <th>SNO</th>
              <th>NAME</th>
              <th>NUMBER</th>
              <th>ORDER_ID</th>
              <th>PAYMENT_ID</th>
              <th>BIKE_NAME</th>
              <th>AMOUNT</th>
              <th>RETURNED</th>
              <th>NOT RETURNED</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} style={{ backgroundColor: user.returned ? "lightgrey" : "white" }}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.orderId}</td>
                <td>{user.paymentId}</td>
                <td>{user.bikeName}</td>
                <td>{user.amount}</td>
                <td>
                  <button
                    onClick={() => handleReturnedClick(index)}
                    disabled={buttonClicked[index]}
                  >
                    Returned
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleNotReturnedClick(index)}
                    disabled={!buttonClicked[index]}
                  >
                    Not Returned
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
}

export default ViewUsers;
