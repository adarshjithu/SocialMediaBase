import React from "react";
import { Atom, Riple } from "react-loading-indicators";
import ReactLoading from "react-loading";

function LoadingComponent({ color }: any) {
     const type = "spin"; // Type of loading indicator

     const height = 25; // Height of the loading indicator
     const width = 25; // Width of the loading indicator

     return (
          <div>
               <ReactLoading type={type} color={color ? color : "#fff"} height={height} width={width} />
          </div>
     );
}

export default LoadingComponent;

export const LoadingComponentTwo = () => {
     return (
          <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
               <Riple color="#4B164C" size="large" text="" textColor="" />
          </div>
     );
};
export const LoadingComponentThree = () => {
     return (
<div className="flex justify-center items-center mt[40px]">
  <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
</div>
     );
};
