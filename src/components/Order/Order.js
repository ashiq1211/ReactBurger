import React from 'react';
import './Order.css'
const order = (props) => {
    const ingredients=[]
    for (let ingredientName in props.ingredients){
        ingredients.push({name:ingredientName,amount:props.ingredients[ingredientName]})
    }
    const ingredientOuput=ingredients.map(ig=>{
    return <span style={{
        textTransform:'capitalize',
        display:'inline-block',
        margin:'0 8px',
        padding:'5px',
        border:'1px solid #ccc'
    }} key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return ( 
        <div className='Order'>
            <p>Ingredients:{ingredientOuput}</p>
    <p>price:<strong>RS.{props.price}</strong></p>
        </div>
     );
}
 
export default order;