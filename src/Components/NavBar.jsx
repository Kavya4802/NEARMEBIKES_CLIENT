import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropDown from "../Components/DropDown";
import Menuitems from "../Constants/MenuItems";
import "./Components.css";

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
                    const response = await fetch(`http://localhost:5000/getcartcount/${user.email}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

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
        <div>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <nav className="navbar">
                {/* <img
          src="https://mvgrglug.com/nearme/wp-content/uploads/2023/04/cropped-cropped-nearme.png"
          alt="Near Me Icon"
         
        /> */}
                <h3>NEARME BIKES</h3>
                <div className="menu-icons">
                    {icon ? (
                        <i
                            onClick={() => {
                                setIcon(false);
                                setHide("menu");
                            }}
                            className="fas fa-times"
                        ></i>
                    ) : (
                        <i
                            onClick={() => {
                                setIcon(true);
                                setHide("menu active");
                            }}
                            className="fas fa-bars"
                        ></i>
                    )}
                </div>

                <ul className={hide}>
                    {/* Menu items */}
                    {Menuitems.map((items, index) => (
                        <li key={index}>
                            {items.title === "Signup" && user ? (
                                <span
                                    className="nav-links"
                                    onClick={() => setOpenProfile((prev) => !prev)}
                                    style={{ cursor: "pointer" }}
                                >
                                    Hi, {user.name}
                                </span>
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
                            <div>
                                <i className="fas fa-shopping-cart"></i>
                                <span className="cart-badge">{cartCount}</span>
                            </div>
                        </Link>
                    </li>
                </ul>
                {openProfile && <DropDown onLogout={handleLogout} />}
            </nav>
        </div>
    );
}

export default Navbar;
