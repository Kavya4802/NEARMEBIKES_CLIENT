import React from "react";
import Navbar from "../../Components/NavBar/NavBar";
import Cards from "../../Components/Cards";
// import Hero from "./Hero";
import BotPress from "../../Utilities/BotPress";
import "react-datetime/css/react-datetime.css";
import Footer from "../../Components/Footer/Footer";
import { useState, useEffect } from "react";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import "./Home.css";

// import Cart from "./Cart";
function Home() {
    const [user, setUser] = useState(null);

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
        }
    }, []);
    return (
        <>
            <Navbar user={user} />
            <AwesomeSlider className="hero">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MH
                xwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="bike-img"
                        className="slider-img"
                    ></img>
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MH
                xwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="bike-img"
                        className="slider-img"
                    ></img>
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MH
                xwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="bike-img"
                        className="slider-img"
                    ></img>
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MH
                xwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="bike-img"
                        className="slider-img"
                    ></img>
                </div>
            </AwesomeSlider>
            {/* <div className="hero">
                <img
                    src="https://images.unsplash.com/photo-1609778269131-b86133da88bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MH
            xwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="bike-img"
                ></img>

            </div> */}
            <Cards user={user} />
            <Footer></Footer>
        </>
    );
}
export default Home;
