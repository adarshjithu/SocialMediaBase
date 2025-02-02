import React, { useContext, useEffect } from "react";
import { colorContext } from "../../Context/colorContext";
import Icon from "../../Components/Icon/Icon";
import { TextField } from "@mui/material";
import "./Navbar.css"
import { logoutUser } from "../../Services/apiService/userService";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../features/user/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
     const dispatch =useDispatch()
     const theme:any = useContext(colorContext);
     const user = useSelector<any>((data)=>data.auth.userData)
     const navigate = useNavigate()
     const logout = ()=>{
          logoutUser()
          dispatch(userLogout())

     }
     useEffect(()=>{
          if(!user){
              navigate('/login')  
          }
     },[user])
     return (
          <div className={` sticky top-0  w-[100%] h-[11vh] flex flex-row`} style={{ backgroundColor: `${theme.themeColor.backgroundColor}` }}>
               <div className="leftnav">
                    <Icon />
               </div>
               <div className="middlenav">
                    <TextField  label='Search for Friends' sx={{ width: "100%", backgroundColor: "white" }} size="small" className="rounded" />
               </div>

               <div className="rightnav">
                    <div className="r-icons ">
                         <div
                              className="h-[60%] w-[35px]  rounded-[100%] mr-1 md:mr-4 md:h-[80%] flex justify-center items-center"
                              style={{ backgroundColor: `${theme.navbarIcon.backgroundColor}` }}
                         >
                              <i className="fa-solid fa-message fa-lg" style={{ color: `${theme.navbarIcon.color}` }}></i>
                         </div>
                         <div
                              className="h-[60%] w-[35px]  rounded-[100%] mr-1 md:mr-4 md:h-[80%] flex justify-center items-center"
                              style={{ backgroundColor: `${theme.navbarIcon.backgroundColor}` }}
                         >
                              <i className="fa-regular fa-bell fa-xl" style={{ color: `${theme.navbarIcon.color}` }}></i>
                         </div>
                         <div
                              className="h-[60%] w-[35px]  rounded-[100%] mr-1 md:mr-4 md:h-[80%]"
                              style={{ backgroundColor: `${theme.navbarIcon.backgroundColor}` }}
                         >
                              <img className="w-full h-full rounded-full" src="public\Images\profile.png" alt="" />
                         </div>
                         <div onClick={logout}>Logout</div>
                    </div>
               </div>
          </div>
     );
}

export default Navbar;
