import React, { useContext, useEffect, useState } from "react";
import { colorContext } from "../../Context/colorContext";
import { LoadingComponentThree, LoadingComponentTwo } from "../Loading/LoadingComponent";

function Post() {
     let arr = [1, 2, 3];
     const theme: any = useContext(colorContext);
     const [loading,setLoading]  =useState(false)
     useEffect(()=>{
     
     },[])
     return (
          <>
          {loading?< LoadingComponentThree/>:
          <div className="post-container w-[100%] flex flex-col items-center  top-[400px] ">
             
               {arr.map((e, index) => {
                    return (
                         <div key={index} className="w-[100%] md:w-[85%] bg-[white]  rounded-[10px] h-[600px] ">
                              <div className="w-[100%] flex flex-row p-2 h-[15%]" style={{ backgroundColor: `${theme.theme}`,borderTop:'0.5px solid gray' }}>
                                   <div className="w-[20%]">
                                        <img className="w[35px] rounded-[100%] h-[35px]" src="public\Images\photo_2024-02-09_18-59-08.jpg" alt="" />
                                   </div>
                                   <div className="w-[70%] flex flex-col">
                                        <span>Adarsh</span>
                                        <span className="text-[10px]">5 hours ago</span>
                                   </div>
                                   <div className="w-[10%]">
                                        <i className="fa-solid fa-ellipsis"></i>
                                   </div>
                              </div>
                              <div className="w-[100%] flex justify-center flex-col h-[85%]">
                                    <div className="h-[85%] w-[100%] bg-black">asdf</div>
                                   <div className="w-[100%] h-[15%] bg-[red]" >asdfasd</div>
                              </div>
                         </div>
                    );
               })}
          </div>}
          </>
     );
}

export default Post;
