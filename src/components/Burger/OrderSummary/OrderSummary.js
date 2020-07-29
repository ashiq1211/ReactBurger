import React from 'react';
import Button from '../../UI/Button/Button';
const orderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients)
    .map(igKey=>{
        return <li key={igKey }>{igKey}:{props.ingredients[igKey]}</li>
    })
 return(
     <React.Fragment>
       <h3>Your Order</h3> 
       <p>A delecious burger with following ingredients:</p> 
       <ul>
           {ingredientSummary}
       </ul>
       <p><strong>Total Price:{props.price}</strong></p>
       <p>Continue to Checkout?</p>
       <Button clicked={props.purchaseCancel} btnType='Danger'>CANCEL</Button>
       <Button  clicked={props.purchaseContinue} btnType='Success'>CONTINUE</Button>
     </React.Fragment>
 )

}
export default orderSummary;