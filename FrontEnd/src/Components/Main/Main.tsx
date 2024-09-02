import React, { useContext } from "react";
import "./Main.css";
import StatusBar from "../StatusBar/StatusBar";
import Thoughts from "../Thoughts/Thoughts";
import Post from "../Post/Post";
import { colorContext } from "../../Context/colorContext";
import { createPost } from "../SideBar/SideBar";
import UploadImage from "../UploadImage/UploadImage";
function Main(props: createPost) {
     const theme: any = useContext(colorContext);
     return (
          <div className="main " style={{ position: "relative", overflow: "auto", scrollbarWidth: "none" }}>
              {props.create?<div className="w-[100%] h-[100%] flex flex-row items-center justify-center">
                    
                    <UploadImage />
               </div>:
               <>
               <div className="mb-2 overflow-hidden rounded mt-4" style={{ backgroundColor: `${theme.theme}` }}>
                    <StatusBar />
                    <div className="bg-white  rounded">
                         <Thoughts />
                    </div>
               </div>
               <div>
                    <Post />
               </div>
               </>}

          </div>
     );
}

export default Main;
