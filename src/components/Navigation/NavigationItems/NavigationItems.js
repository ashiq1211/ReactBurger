import React from 'react'
import './NavigationItems.css'
import NavigationItem from '../NavigationItem/NavigationItem';
const navigationItems=(props)=>(
    <ul className='NavigationItems'>
     <NavigationItem link='/' exact>Burger Builder</NavigationItem>
     {props.isAuth?<NavigationItem link='/orders' >Orders</NavigationItem>:null}
     
     {!props.isAuth?
     <NavigationItem link='/auth' >Login</NavigationItem>
     :<NavigationItem link='/logout' >Logout</NavigationItem>}

    </ul>
   
)
export default navigationItems