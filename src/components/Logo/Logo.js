import React from 'react'
import  './Logo.css';
import ImageLogo from '../../assets/Images/burger-logo.png';
const logo=()=>(
   <div className='Logo'>
       <img src={ImageLogo} alt='MyBurger'></img>
   </div> 
)
export default logo