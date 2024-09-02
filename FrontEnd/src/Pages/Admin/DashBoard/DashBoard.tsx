import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function DashBoard() {
     const admin = useSelector((data: any) => data.auth.adminData);
     const navigate = useNavigate();
     useEffect(() => {
          if (!admin) {
               navigate("/admin/login");
          }
     }, [admin]);
     return <div>Dashboard</div>;
}

export default DashBoard;
