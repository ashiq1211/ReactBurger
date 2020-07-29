import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import './Burger.css'
const burger=(props)=>{
    let transformedIngredients=Object.keys(props.ingredient)
    .map(igkey=>{
        return[...Array(props.ingredient[igkey ])]
        .map((_,i)=>{
            return <BurgerIngredient key={igkey+i} type={igkey}/>;
            
        })
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please start adding ingredients!</p>
    }
    
    return(
        <div className={"Burger"}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient  type="bread-bottom"></BurgerIngredient>
        </div>
    );

}
export default burger;