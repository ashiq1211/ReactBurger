import React from 'react';
import './DrawerToggle.css'
const drawerToggle=(props)=>(
    <div  className='DrawerToggle' onClick={props.drawerClicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)
export default drawerToggle