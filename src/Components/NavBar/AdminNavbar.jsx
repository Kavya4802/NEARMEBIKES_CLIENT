import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./AdNavstyles.css";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part */}
        <div className="logo">
          <NavLink to="/">
            <img
              className="rectangle"
              alt="Rectangle"
              src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bbcbfb1d18552ae4faf221/img/rectangle-2.png"
            />
          </NavLink>
        </div>

        {/* 2nd menu part */}
        <div
          className={showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"}
        >
          <ul>
            <li>
              <NavLink to="/Dashboard">Dashboard</NavLink>
            </li>
            <li className="dropdown">
              <span >Vehicle Management</span>
              <ul className="dropdown-content">
                <li>
                  <NavLink to="/addbike">Add Bikes</NavLink>
                </li>
                <li>
                  <NavLink to="/viewbike">View Bikes</NavLink>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <span >Booking Management</span>
              <ul className="dropdown-content">
                <li>
                  <NavLink to="/viewuser">View Orders</NavLink>
                </li>
                <li>
                  <NavLink to="/returnstatus">Return Vehicles</NavLink>
                </li>
                <li>
                  <NavLink to="/userHistory">View History</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/">Logout</NavLink>
            </li>
          </ul>
        </div>

        {/* Hamburger menu start */}
        <div className="social-media">
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu style={{ color: "black" }} />
            </a>
          </div>
        </div>
      </nav>
      {/* <img
        className="rectangle-8"
        alt="Rectangle"
        src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bbe0dc7baf1f6eab2a7de0/img/rectangle-10.png"
      /> */}
    </>
  );
};

export default Navbar;
