
import { useState, useEffect, useRef } from "react";
import "./viewreturn.css";
import Navbar from "../../../Components/NavBar/AdminNavbar";
import Footer from "../../../Components/Footer/Footer";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
function ViewReturns() {
  const [users, setUsers] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(() => {
    // Initialize buttonClicked state with values from localStorage
    const storedState = localStorage.getItem("buttonClicked");
    return storedState ? JSON.parse(storedState) : {};
  });
  const [filterText, setFilterText] = useState("");
  const printRef = useRef();
  const filteredUsers = users.filter((user) =>
  user.userName.toLowerCase().includes(filterText.toLowerCase()) ||
    user.phoneNumber.toLowerCase().includes(filterText.toLowerCase()));
  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = 5;
  const firstIndex = (currentPage - 1) * recordPerPage;
  const lastIndex = currentPage * recordPerPage;
  const records = filteredUsers.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredUsers.length/ recordPerPage);
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
    // Fetch data from the server when the component mounts
    fetch("http://localhost:5000/api/transactions")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Update localStorage whenever buttonClicked changes
    localStorage.setItem("buttonClicked", JSON.stringify(buttonClicked));
  }, [buttonClicked]);   

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
  const handlePrint = useReactToPrint({
  content: () => printRef.current,
  });

  return (
    <div className="return-parent">
    <Navbar></Navbar>
<div className="viewreturn-container">
  <br />
  <br />
  <main>
    <div className="fil-container">
      <label htmlFor="fil">Filter by Name:</label>
      <input
        type="text"
        id="filter"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
        <button onClick={handlePrint}><PrintIcon /></button>
    </div>
    <table className="return-table" ref={printRef}>
      <thead>
        <tr>
          <th style={{ backgroundColor: "#ff8400" }}>SNO</th>
          <th style={{ backgroundColor: "#ff8400" }}>NAME</th>
          <th style={{ backgroundColor: "#ff8400" }}>NUMBER</th>
          {/* <th style={{ backgroundColor: "#ff8400" }}>Email</th> */}
          <th style={{ backgroundColor: "#ff8400" }}>ORDER_ID</th>
          {/* <th style={{ backgroundColor: "#ff8400" }}>PAYMENT_ID</th> */}
          <th style={{ backgroundColor: "#ff8400" }}>BIKE_NAME</th>
          {/* <th style={{ backgroundColor: "#ff8400" }}>AMOUNT</th> */}
          <th style={{ backgroundColor: "#ff8400" }}>RETURNED</th>
          <th style={{ backgroundColor: "#ff8400" }}>NOT RETURNED</th>
        </tr>
      </thead>
      <tbody>
        {records.map((user, index) => (
          <tr key={user._id} style={{ backgroundColor: user.returned ? "lightgrey" : "white" }}>
            <td data-label="S.No">{firstIndex + index + 1}</td>
            <td data-label="Name">{user.userName}</td>
            <td data-label="Ph.No">{user.phoneNumber}</td>
            {/* <td data-label="Ph.No">{user.userEmail}</td> */}
            <td data-label="Order_id">{user.orderId}</td>
            {/* <td data-label="Payment_id">{user.paymentId}</td> */}
            <td data-label="BikeName">{user.bikeName}</td>
            {/* <td data-label="Price">{user.amount}</td> */}
            <td data-label="Returned">
              <button
                onClick={() => handleReturnedClick(index)}
                disabled={buttonClicked[index]}
              >
                Returned
              </button>
            </td>
            <td data-label="Non-Returned">
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
      <nav>
  <ul className="pagi">
    <li className="pagi-item">
      <button className="pagi-link" onClick={prePage}>
        Prev
      </button>
    </li>
    {numbers.map((n, i) => (
      <li
        className={`pagi-item ${currentPage === n ? "pagi-active" : ""}`}
        key={i}
      >
        <button className="pagi-link" onClick={() => changeCPage(n)}>
          {n}
        </button>
      </li>
    ))}
    <li className="pagi-item">
      <button className="pagi-link" onClick={nextPage}>
        Next
      </button>
    </li>
  </ul>
</nav>
    </table>
  
  </main>
</div>

<Footer></Footer>

</div>
 );
}

export default ViewReturns;
