import React from "react";
import Hero from "../Home/Hero";
import AboutUs from "./AboutUs";
import Navbar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
function About() {
    return (
        <div>
            <Navbar></Navbar>
            <Hero
                cName="hero-about"
                heroImg="https://images.unsplash.com/photo-1656420731047-3eb41c9d1dee?ixlib=rb-4.0.3
            &ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80"
                title="About"
                url="/about"
            >
            </Hero>
            <AboutUs></AboutUs>
        </div>
    )
}
export default About;
