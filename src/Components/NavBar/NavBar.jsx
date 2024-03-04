import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropDown from "../DropDown";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io"; 
import Menuitems from "../../Constants/MenuItems";
import "./NavBar.css";
import { IoCart } from "react-icons/io5";

function Navbar({ userc }) {
  const [icon, setIcon] = useState(false);
  const [hide, setHide] = useState("menu");
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:5000/getusers", {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            setUser(data.user);
          } else {
            console.log("Error fetching user details");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setUser(null);
    }
  }, [userc]);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        if (user) {
          const response = await fetch(
            `http://localhost:5000/getcartcount/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setCartCount(data.cartCount);
          } else {
            console.error("Error fetching cart count");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartCount();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCartCount(0);
    setOpenProfile(false);
    navigate("/");
  };

  return (
    <div style={{ position: "relative" }}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <nav className="navbar">
        {/* <img
          src="https://mvgrglug.com/nearme/wp-content/uploads/2023/04/cropped-cropped-nearme.png"
          alt="Near Me Icon"
         
        /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <img
            className="rectangle"
            alt="Rectangle"
            src="https://cdn.animaapp.com/projects/65bbc2f61fb5420bd6884d53/releases/65bbcbfb1d18552ae4faf221/img/rectangle-2.png"
          />
          <h3 style={{ fontWeight: "bolder", fontSize: "1.5em" }}>
            NEARME BIKES
          </h3>
        </div>
        <div className="menu-icons">
          {icon ? (
            <RxCross1
              className="hamburger-icon"
              onClick={() => {
                setIcon(false);
                setHide("menu");
              }}
            />
          ) : (
            <RxHamburgerMenu
              className="hamburger-icon"
              onClick={() => {
                setIcon(true);
                setHide("menu active");
              }}
            />
          )}
        </div>

        <ul className={hide}>
          {/* Menu items */}
          {Menuitems.map((items, index) => (
            <li key={index}>
              {items.title === "Signup" && user ? (
                <div className="user-dropdown">
              <span
                className="nav-links"
                onClick={() => setOpenProfile((prev) => !prev)}
                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                Hi, {user.name} <IoIosArrowDown style={{ marginLeft: '5px' }} /> {/* Arrow icon */}
              </span>
              {openProfile && <DropDown onLogout={handleLogout} userEmail={user.email} />}
            </div>
              ) : (
                <Link className={items.className} to={items.route}>
                  <i className={items.icon}></i>
                  {items.title}
                </Link>
              )}
            </li>
          ))}
          {/* Cart icon */}
          <li>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IoCart className="cart-logo" />
                <span className="cart-badge">{cartCount}</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
