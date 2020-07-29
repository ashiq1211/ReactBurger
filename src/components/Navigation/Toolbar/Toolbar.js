import React from 'react';
import './Toolbar.css'
import Logo from '../../Logo/Logo';
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle';
import  NavigationItems from '../NavigationItems/NavigationItems'
const toolbar=(props)=>(
   <header className='Toolbar'>
       <DrawerToggle drawerClicked={props.showDrawerClicked}></DrawerToggle>
    
       <Logo ></Logo>
      
      
       <nav className='DesktopOnly'>
        <NavigationItems isAuth={props.token}></NavigationItems>  
       </nav>
   </header>
)
export default toolbar