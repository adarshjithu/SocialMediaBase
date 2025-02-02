import React from "react";
import ASidebar from "../../../Components/Admin/ASidebar/ASidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ADashboard from "../../../Components/Admin/ADashboard/ADashboard";

function Layout() {
     return (
      <BrowserRouter>
      <Routes>
        <Route path="/admin/dashboard" Component={ASidebar}/>
      </Routes>
      
    </BrowserRouter>
           
     );
}

export default Layout;
