import React, { useContext, useState } from 'react'
import './Footer.css'
import { colorContext } from '../../Context/colorContext'
function Footer() {
  const theme:any =  useContext(colorContext);
  const [hover,setHover] = useState(0)
  const handleHover = (id:any)=>{
   setHover(id)
  }
  const handleMouseLeave = ()=>{
    setHover(0)
  }
  
  return (
    <div className='footer-class'>
      <div style={{backgroundColor:`${hover==1?theme.themeColor.backgroundColor:''}`}}>

       <i className="fa-solid fa-house fa-lg p-5 icon" style={{ color: `${hover==1?'white':theme.sidebar.iconColor}`}} onMouseEnter={()=>handleHover(1)} onMouseLeave={handleMouseLeave}></i>
      </div>
      <div style={{backgroundColor:`${hover==2?theme.themeColor.backgroundColor:''}`}}>

       <i className="fa-solid fa-plus fa-lg p-5 icon" style={{ color: `${hover==2?'white':theme.sidebar.iconColor}` }} onMouseEnter={()=>handleHover(2)} onMouseLeave={handleMouseLeave}></i>
      </div>
      <div style={{backgroundColor:`${hover==3?theme.themeColor.backgroundColor:''}`}}>


       <i className="fa-solid fa-user fa-lg p-5 icon" style={{ color: `${hover==3?'white':theme.sidebar.iconColor}` }} onMouseEnter={()=>handleHover(3)} onMouseLeave={handleMouseLeave}></i>
      </div>
      <div style={{backgroundColor:`${hover==4?theme.themeColor.backgroundColor:''}`}}>


       <i className="fa-solid fa-magnifying-glass fa-lg p-5 icon" style={{ color: `${hover==4?"white":theme.sidebar.iconColor}` }} onMouseEnter={()=>handleHover(4)} onMouseLeave={handleMouseLeave}></i>
      </div>
       
       
    </div>
  )
}

export default Footer
