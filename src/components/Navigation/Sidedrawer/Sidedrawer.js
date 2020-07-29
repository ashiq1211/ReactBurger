import React from 'react'
import './Sidedrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop';
import { checkPropTypes } from 'prop-types';
const sideDrawer=(props)=>{
  let attachedClasses=['SideDrawer','Close']
  if(props.open){
      attachedClasses=['SideDrawer','Open']
  }
    return(
        <React.Fragment>
            <Backdrop show={props.open } clicked={props.closed}></Backdrop>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className='LogoDrawer'>
            <Logo></Logo>
            </div>
         
          <nav>
            <NavigationItems isAuth={props.token}></NavigationItems>
          </nav>
        </div>
        </React.Fragment>
       
    )
}
export default sideDrawer