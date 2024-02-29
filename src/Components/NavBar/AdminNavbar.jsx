import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import "./AdNavstyles.css";

const Navbar = () => {
  const [shMediaIcons, setShMediaIcons] = useState(false);

  return (
    <>
      <nav className="mainss-nav">
        {/* 1st logo part */}
        <div className="logos">
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
          className={shMediaIcons ? "me-link mobile-me-link" : "me-link"}
        >
          <ul>
            <li>
              <NavLink to="/Dashboard">Dashboard</NavLink>
            </li>
            <li className="down">
              <span>Vehicle Management</span>
              <ul className="down-content">
                <li>
                  <NavLink to="/addbike">Add Bikes</NavLink>
                </li>
                <li>
                  <NavLink to="/viewbike">View Bikes</NavLink>
                </li>
              </ul>
            </li>
            <li className="down">
              <span>Booking Management</span>
              <ul className="down-content">
                <li>
                  <NavLink to="/viewuser">View Orders</NavLink>
                </li>
                <li>
                  <NavLink to="/returnstatus">Return Vehicles</NavLink>
                </li>
                
              </ul>
            </li>
            <li>
              <NavLink to="/">Logout</NavLink>
            </li>
          </ul>
        </div>

        {/* Hamburger menu start */}
        <div className="soc">
          <div className="hamb-menu">
            <a href="#" onClick={() => setShMediaIcons(!shMediaIcons)}>
              {shMediaIcons ? (
                <RxCross1 style={{ color: "black" }} />
              ) : (
                <RxHamburgerMenu style={{ color: "black" }} />
              )}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
