 import React from 'react';
 import './BuildControls.css'
 import BuildControl from './BuildControl/BuildControl';
  const controls=[
      {label:'Salad' ,type:'salad'},
      {label:'Bacon' ,type:'bacon'},
      {label:'Cheese' ,type:'cheese'},
      {label:'Meat' ,type:'meat'}
  ]
 const BuildControls=(props)=>(
       
   <div className='BuildControls'>
        <p >Current Price:<strong>{props.price.toFixed(2)}</strong></p>
       {
         
           controls.map(ctrls=>(
               <BuildControl price={props.price}
               disabled={props.disabled[ctrls.type]}
               removed={()=>props.ingredientsRemoved(ctrls.type)}
               added={()=>props.ingredientsAdded(ctrls.type)}
               key={ctrls.label} label={ctrls.label}/>
           ))
       }
         <button onClick={props.ordered} disabled={!props.purchasable} className='OrderButton'>{props.isAuth?'ORDER NOW':'SIGNUP TO ORDER'}</button>

   </div>

 )
 export default BuildControls