import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import Main from "../../../Components/Main/Main";
import RightSidebar from "../../../Components/RightSidebar/RightSidebar";
import { colorContext } from "../../../Context/colorContext";
import SideBar from "../../../Components/SideBar/SideBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
     const [create, setCreate] = useState<boolean>(false);
     const theme: any = useContext(colorContext);
     const user = useSelector<any>((data) => data?.auth?.userData);
     const navigate = useNavigate();
     console.log(create)
     useEffect(() => {
          if (!user) {
               navigate("/login");
          }
     }, []);
     return (
          <>
               <Navbar />
               <div
                    className="flex flex-row w-full h-screen   "
                    style={{ overflow: "hidden", position: "fixed", top: "10", backgroundColor: `${theme.theme}` }}
               >
                    <SideBar create={create} setCreate ={setCreate} />
                    <Main create={create} setCreate ={setCreate} />
                    <RightSidebar />*
               </div>

               <Footer />
          </>
     );
}

export default Home;
