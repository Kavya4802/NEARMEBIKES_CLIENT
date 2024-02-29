// DropDown.js

import React from "react";
import { Link } from "react-router-dom";
import "./DropDown.css";
const DropDown = ({ onLogout, userEmail }) => {
  return (
    <div className="dropdown">
      <Link to={`/profile/${userEmail}`} className="dropdown-link">
        Profile
      </Link>
      <Link to="/orders" className="dropdown-link">
        Orders
      </Link>
      <div className="dropdown-link" onClick={onLogout} style={{ cursor: "pointer" }}>
        Logout
      </div>
    </div>
  );
};

export default DropDown;
