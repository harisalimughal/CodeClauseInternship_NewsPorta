import React from 'react'
import { Link } from 'react-router-dom';
import logo from './news.gif';

const Hero = () => {
  return (
    <div className="container-fluid bg-white text-white d-flex justify-content-center align-items-center flex-column" style={{height:"50vh"}}
    >  <Link to="/" >  
    <img src={logo} alt="Logo" style={{width:'1348px', height:'490px'}}/>
    </Link> 
  
    </div>
  )
}

export default Hero