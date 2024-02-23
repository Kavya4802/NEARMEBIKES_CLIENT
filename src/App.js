// App.js
import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./Components/AdminRoutes";
import Home from './Pages/Home/Home';
import Navbar from "./Components/NavBar/NavBar";
import About from './Pages/About/About';
import Login from './Pages/Authentication/Login';
import Register from './Pages/Authentication/Register';
// import Register from "./Pages/Register";
import BookingBike from "./Components/Bookbike";
// import ViewBikes from "./Pages/ViewBikes";
import Payment from "./Pages/Payment/Payment";
// import Payment from "./Pages/Payment";
import Terms from "./Components/Termsofservice";
// import Terms from "./Pages/Termsofservice";
import Privacy from "./Pages/Docs/Privacypolicy";
// import Privacy from "./Pages/Privacypolicy";
import Cart from "./Pages/Cart/Cart";
// import Cart from "./Pages/Cart";
import PasswordReset from "./Pages/HandlePassword/Passwordreset";
// import PasswordReset from "./Pages/PasswordReset";
import ForgotPassword from "./Pages/HandlePassword/ForgotPassword";
// import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Components/Dashboard";
// import Dashboard from "./ADMIN/Dashboard";
import AddBike from "./Components/AddBike";
// import AddBike from "./ADMIN/AddBike";
import ViewBikes from "./Pages/Views/AdminViewBikes/ViewBikes";
// import ViewBike from "./ADMIN/ViewBike";
import ViewUsers from "./Pages/Views/ViewUsers/ViewUsers";
// import ViewUsers from "./ADMIN/ViewUsers";
import ViewBike from "./Pages/Views/AdminViewBikes/ViewBikes";
import Updates from "./Components/Updates";
import Orders from "./Components/Orders";
import Wrapper from "./Components/Wrapper";
// import { lookInSession } from "./Session";



function App() {
  const [userAuth, setUserAuth] = useState({});
  const [isValidToken, setValidToken] = useState(false);
  useEffect(() => {
    // let userInSession = lookInSession("user");
    // userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null })
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
        <Route path="/viewuser" element={<Wrapper><ViewUsers /></Wrapper>} />
        <Route path="/viewbike" element={<Wrapper><ViewBike /></Wrapper>} />
        <Route path="/AppRoutes/*" element={<AppRoutes />} />
        <Route path="/bikeupdate/:bikeId" element={<Wrapper><Updates /></Wrapper>} />
        <Route path="/orders/:email" element={<Wrapper><Orders /></Wrapper>} />
      </Routes>``
    </Router>
  );
}

export default App;
