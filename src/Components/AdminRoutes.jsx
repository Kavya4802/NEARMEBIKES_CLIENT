// AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ViewBike from "../Pages/Views/AdminViewBikes/ViewBikes";
import ViewUsers from "../Pages/Views/ViewUsers/ViewUsers";
import AddBike from "./AddBike";
import Updates from "./Updates";
import AdminFooter from "./Footer/AdminFooter";


function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* <Route path="content" element={<Content />} /> */}
          <Route path="/addbike" element={<AddBike />} />
          <Route path="/viewbike" element={<ViewBike />} />
          <Route path="/bikeupdate/:id" element={<Updates />} />
          <Route path="/viewuser" element={<ViewUsers />} />
          <Route path="/footer" element={<AdminFooter />} />
        </Route>
      </Routes>
    );
  }
  

export default AppRoutes;
