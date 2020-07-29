import * as actionType from '../actions/actionTypes'
const initialState={
    ingredients:null,
    error:false,
    totalPrice:4,
    building:false
 
}
const INGREDIENT_PRICES={
    salad:0.5,
    bacon:1,
    cheese:0.75,
    meat:1
  }
const reducer=(state=initialState,action)=>{
  
     switch (action.type) {
        case actionType.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false,
                totalPrice:4,
                building:false
            }
         case actionType.ADD_INGREDIENT:
           
          
            
              return{
                  ...state,
                  ingredients:{
                      ...state.ingredients,
                      [action.ingredientName]:state.ingredients[action.ingredientName]+1
                  },
                  totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName],
                  building:true
                  
              }
             
             
         case actionType.REMOVE_INGREDIENT:
             
             return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName],
                building:true
                
            }
        
         case actionType.FETCH_INGREDIENTS_FAILED:
                return{
                    ...state,
                    error:true
                }
           
         
     
         default:
             return state;
     }

}
export default reducer