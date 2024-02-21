// App.js
import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./ADMIN/AppRoutes";
import Home from "./Pages/Home";
import Navbar from "./Pages/Navbar";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import BookingBike from "./Pages/BookingBike";
import ViewBikes from "./Pages/ViewBikes";
import Payment from "./Pages/Payment";
import Terms from "./Pages/Termsofservice";
import Privacy from "./Pages/Privacypolicy";
import Cart from "./Pages/Cart";
import PasswordReset from "./Pages/PasswordReset";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./ADMIN/Dashboard";
import AddBike from "./ADMIN/AddBike";
import ViewBike from "./ADMIN/ViewBike";
import ViewUsers from "./ADMIN/ViewUsers";
import Update from "./ADMIN/Update";
import Orders from "./Pages/Orders";
import Wrapper from "./Pages/Wrapper"; // Import the Wrapper component
import { lookInSession } from "./Session";



function App() {
  const [userAuth, setUserAuth] = useState({});
  const [isValidToken, setValidToken] = useState(false);
  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })
  }, [])

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Wrapper>
              <Home />
            </Wrapper>
          }
        />
        <Route
          path="/navbar"
          element={
            <Wrapper>
              <Navbar />
            </Wrapper>
          }
        />
        <Route path="/about" element={<Wrapper><About /></Wrapper>} />
        <Route path="/login/:id" element={<Wrapper><Login /></Wrapper>} />
        <Route path="/login" element={<Wrapper><Login /></Wrapper>} />
        <Route path="/register" element={<Wrapper><Register /></Wrapper>} />
        <Route path="/register/:id" element={<Wrapper><Register /></Wrapper>} />
        <Route path="/bookingbike" element={<Wrapper><BookingBike /></Wrapper>} />
        <Route path="/allbikes" element={<Wrapper><ViewBikes /></Wrapper>} />
        <Route path="/payment/:id" element={<Wrapper><Payment /></Wrapper>} />
        <Route path="/terms" element={<Wrapper><Terms /></Wrapper>} />
        <Route path="/privacypolicy" element={<Wrapper><Privacy /></Wrapper>} />
        <Route path="/cart" element={<Wrapper><Cart /></Wrapper>} />
        <Route path="/password-reset" element={<Wrapper><PasswordReset /></Wrapper>} />
        <Route path="/forgotpassword/:id/:tokens" element={<Wrapper><ForgotPassword /></Wrapper>} />
        <Route path="/Dashboard" element={<Wrapper><Dashboard /></Wrapper>} />
        <Route path="/addbike" element={<Wrapper><AddBike /></Wrapper>} />
        <Route path="/viewbike" element={<Wrapper><ViewBike /></Wrapper>} />
        <Route path="/viewuser" element={<Wrapper><ViewUsers /></Wrapper>} />
        <Route path="/bikeupdate/:bikeId" element={<Wrapper><Update /></Wrapper>} />
        <Route path="/orders/:email" element={<Wrapper><Orders /></Wrapper>} />
        <Route path="/AppRoutes/*" element={<AppRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
