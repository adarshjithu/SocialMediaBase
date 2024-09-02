import React, { useContext, useState } from "react";
import { colorContext } from "../../Context/colorContext";
import './SideBar.css'

export interface createPost{
     create:boolean;
     setCreate:React.Dispatch<React.SetStateAction<boolean>>
}

const  SideBar=(props:createPost)=> {
     const theme:any = useContext(colorContext);
     const [hover,setHover] = useState<number>(0);
    

   

     return (
          <div className="w-[25%] h-[90vh] sidebar sticky top-0" >
               <ul className="ul w-[85%] h-full  p-6">
                    <li className=" h-[40px] rounded font-medium list" onMouseOver={()=>setHover(1)} onMouseLeave={()=>setHover(0)} style={{backgroundColor:`${hover==1?theme.themeColor.backgroundColor:'#f4f4f4'}`}}>
                         <i className="fa-regular fa-bell fa-lg p-5 icon" style={{ color: `${hover==1?"white":theme.sidebar.iconColor}` }}></i>
                         <span style={{color:`${hover==1?"white":theme.sidebar.textColor}`,fontSize:"18px",cursor:'pointer',}}>Home</span>
                    </li>
                    <li className="bg-[#f4f4f4] h-[40px] rounded font-medium "onMouseOver={()=>setHover(2)} onMouseLeave={()=>setHover(0)} style={{backgroundColor:`${hover==2?theme.themeColor.backgroundColor:'#f4f4f4'}`}}>
                         <i className="fa-solid fa-message fa-lg p-5" style={{ color: `${hover==2?'white':theme.sidebar.iconColor}` }}></i>
                         <span   style={{color:`${hover==2?'white':theme.sidebar.textColor}`,fontSize:"18px"}}>Message</span>
                    </li>

                    <li className="bg-[#f4f4f4] h-[40px] rounded font-medium "onMouseOver={()=>setHover(3)} onMouseLeave={()=>setHover(0)} style={{backgroundColor:`${hover==3?theme.themeColor.backgroundColor:'#f4f4f4'}`}}>
                         <i className="fa-magnifying-glass fa-solid fa-lg p-5" style={{ color: `${hover==3?'white':theme.sidebar.iconColor}` }}></i>
                         <span   style={{color:`${hover==3?'white':theme.sidebar.textColor}`,fontSize:"18px"}}>Search</span>
                    </li>
                    <li className="bg-[#f4f4f4] h-[40px] rounded font-medium "onMouseOver={()=>setHover(4)} onMouseLeave={()=>setHover(0)} style={{backgroundColor:`${hover==4?theme.themeColor.backgroundColor:'#f4f4f4'}`}}>
                         <i className="fa-regular fa-bell fa-lg p-5" style={{ color: `${hover==4?'white':theme.sidebar.iconColor}` }}></i>
                         <span   style={{color:`${hover==4?'white':theme.sidebar.textColor}`,fontSize:"18px"}}>Notification</span>
                    </li>
                    <li onClick={()=>props.setCreate(!props.create)} className="bg-[#f4f4f4] h-[40px] rounded font-medium "onMouseOver={()=>setHover(5)} onMouseLeave={()=>setHover(0)} style={{backgroundColor:`${hover==5?theme.themeColor.backgroundColor:'#f4f4f4'}`}}>
                         <i className="fa-solid fa-plus fa-lg p-5" style={{ color: `${hover==5?'white':theme.sidebar.iconColor}` }}></i>
                         <span   style={{color:`${hover==5?'white':theme.sidebar.textColor}`,fontSize:"18px"}}>Create</span>
                    </li>
                    <li className="bg-[#f4f4f4] h-[40px] rounded font-medium " onMouseOver={()=>setHover(6)} onMouseLeave={()=>setHover(0)} style={{backgroundColor:`${hover==6?theme.themeColor.backgroundColor:'#f4f4f4'}`}}>
                         <i className="fa-solid fa-user-group fa-lg p-5" style={{ color: `${hover==6?'white':theme.sidebar.iconColor}` }}></i>
                         <span   style={{color:`${hover==6?'white':theme.sidebar.textColor}`,fontSize:"18px"}}>Request</span>
                    </li>
                    <li className="bg-[#f4f4f4] h-[40px] rounded font-medium "onMouseOver={()=>setHover(7)} onMouseLeave={()=>setHover(0)} style={{backgroundColor:`${hover==7?theme.themeColor.backgroundColor:'#f4f4f4'}`}}>
                         <i className="fa-regular fa-bell fa-lg p-5" style={{ color: `${hover==7?'white':theme.sidebar.iconColor}` }}></i>
                         <span   style={{color:`${hover==7?'white':theme.sidebar.textColor}`,fontSize:"18px"}}>Profile</span>
                    </li>
                    <li className="bg-[#f4f4f4] h-[40px] rounded font-medium "onMouseOver={()=>setHover(8)} onMouseLeave={()=>setHover(0)} style={{backgroundColor:`${hover==8?theme.themeColor.backgroundColor:'#f4f4f4'}`}}>
                         <i className="fa-solid fa-gear fa-lg p-5" style={{ color: `${hover==8?"white":theme.sidebar.iconColor}` }}></i>
                         <span   style={{color:`${hover==8?'white':theme.sidebar.textColor}`,fontSize:"18px"}}>Settings</span>
                    </li>
                
                    
                   
                    
               </ul>
          </div>
     );
}

export default SideBar;
