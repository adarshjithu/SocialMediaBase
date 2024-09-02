import React, { useContext } from "react";
import "./Thoughts.css";
import { TextField } from "@mui/material";
import { colorContext } from "../../Context/colorContext";

function Thoughts() {
  const theme:any = useContext(colorContext)
  
     return (
      <>
          <div className="thoughts sticky-0   ">
             <div className="w-[10%] mt-2">
              <img src="public/Images/photo_2024-02-09_18-59-08.jpg" className="h-[40px] w-[40px] rounded-[100%]"/>
                
              
             </div>
             <div className="w-[80%] mt-2">
              <input  className=" inp w-full h-[40px] bg-[#D9D9D9] rounded-[20px] p-4" placeholder="Whats On Your Mind ?" color="#4B164C" type="text" name="" id="" />
             </div>
             

          </div>
          <div className="thoughts">
            <hr style={{color:'black',width:'95%'}}/>
            
      
          </div>
          <div className="w-full flex flex-row justify-around mt-4 thoughts-post">
            <div style={{color:`${theme.thoughts.fontColor}`}} >
            <i className="fa-solid fa-image fa-lg p-5" style={{ color: `${theme.thoughts.iconColor}` }}></i>
            Photo
            </div>
            <div style={{color:`${theme.thoughts.fontColor}`}} >
            <i className="fa-solid fa-video fa-lg p-5" style={{ color: `${theme.thoughts.iconColor}` }}></i>
              Video
            </div>
            <div style={{color:`${theme.thoughts.fontColor}`}} >
            <i className="fa-solid fa-smile fa-lg p-5" style={{ color: `${theme.thoughts.iconColor}` }}></i>
              Feeling
            </div>
            
      
          </div>
        
       
      </>
     );
}

export default Thoughts;
