import React from "react";
import Login from "./Pages/User/Login/Login";
import "./App.css";
import Signup from "./Pages/User/Signup/Signup";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import ForgetPassword from "./Pages/User/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/User/ResetPassword/ResetPassword";
import VerifyEmail from "./Pages/User/VerifyEmail/VerifyEmai";
import SubmitOtp from "./Pages/User/SubmitOtp/SubmitOtp";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // or other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import Home from "./Pages/User/Home/Home";
import { Toaster } from "react-hot-toast";
import forgetPasswordOtp from "./Pages/User/ForgetPasswordOtp/ForgetPasswordOtp";

import ASidebar from "./Components/Admin/ASidebar/ASidebar";
import DashBoard from "./Pages/Admin/DashBoard/DashBoard";
import UserManagement from "./Pages/Admin/UserManagement/UserMangement";
import AdminLogin from "./Pages/Admin/ALogin/ALogin";





function App() {
     return (
          <div>
               
               

           
                    <Toaster position="top-center" reverseOrder={false} />
                
               <BrowserRouter>
                    <Routes>
                         <Route path="/login" Component={Login} />
                         <Route path="/signup" Component={Signup} />
                         <Route path="/forget-password" Component={ForgetPassword} />
                         <Route path="/reset-password" Component={ResetPassword} />
                         <Route path="/verify-email" Component={VerifyEmail} />
                          <Route path="/submit-otp" Component={SubmitOtp} />
                         <Route path="/" Component={Home} />
                         <Route path="/forget-password-otp" Component={forgetPasswordOtp} />
                         <Route path="/admin" element={<ASidebar><DashBoard/></ASidebar>} />
                         <Route path="/admin/usermanagement" element={<ASidebar><UserManagement/></ASidebar>} />
                         <Route path="/admin/login" Component={AdminLogin}/>
                     
                    

                       


                    </Routes>
               </BrowserRouter>
          </div>
     );
}

export default App;
