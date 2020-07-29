import React,{Component} from 'react';
import Burger from '../../components/Burger/Burger';
 import Modal from '../../components/UI/Modal/Modal';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import Checkout from '../Checkout/Checkout'
import {connect} from 'react-redux';
import * as BurgerBuilderActionCreators from '../../store/actions/index'


class BurgerBuilder extends Component{
  state={
    
    purchasable:false,
    purchasing:false,
    
  }
  componentDidMount(){
    

    this.props.onInitIngredients()
  }
  updatePurchaseState=(ingredients)=>{
   
    const sum=Object.keys(ingredients)
       .map(igKey=>{
         return ingredients[igKey]
       })
       .reduce((sum,el)=>{
         return sum+el
       },0)
      return sum>0

  }
  purchaseHandler=()=>{
    if(this.props.isAuth){
      this.setState({purchasing:true})
    }else{
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
   
  }
  purchaseCancelHandler=()=>{
    this.setState({purchasing:false})
  }
  // addIngredientHandler=(type)=>{
  //   const oldCount=this.state.ingredients[type]
  //   const updatedCount=oldCount+1
  //   const updatedIngredients={
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type]=updatedCount
  //   const priceAddition=INGREDIENT_PRICES[type]
  //   const oldPrice=this.state.totalPrice
  //   const newPrice=oldPrice+priceAddition
  //   this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
  //   this.updatePurchaseState(updatedIngredients);
  // }
  // removeIngredientHandler=(type)=>{
  //   const oldCount=this.state.ingredients[type]
  //   if(oldCount<=0){
  //     return
  //   }
  //   const updatedCount=oldCount-1
  //   const updatedIngredients={
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type]=updatedCount
  //   const priceDeduction=INGREDIENT_PRICES[type]
  //   const oldPrice=this.state.totalPrice
  //   const newPrice=oldPrice-priceDeduction
  //   this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
  //   this.updatePurchaseState(updatedIngredients);
  // }
   purchaseContinueHandler=()=>{
    //  alert('You are Continue!!')
   
    // const queryParams=[]
    // for(let i in this.props.ings){
    //   queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]))
    // }
    // queryParams.push('price='+this.props.price)
    // const queryString=queryParams.join('&')
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
    // ({
      // pathname:'/checkout',
      // search:'?'+queryString

    // })
   }
  render(){
    const disabledInfo={
      ...this.props.ings
    }
    for(let key in disabledInfo){
      disabledInfo[key]=disabledInfo[key]<=0
    }
    let orderSummary=null

    
   
    let burger= this.props.error?<p>ingredients cannot be loaded</p>: <Spinner></Spinner>
    if(this.props.ings){
      burger=(
        <React.Fragment>
           <Burger ingredient={this.props.ings}></Burger>
            <BuildControls ordered={this.purchaseHandler} 
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            disabled={disabledInfo}
            isAuth={this.props.isAuth}
            ingredientsRemoved={this.props.onIngredientRemoved} ingredientsAdded={this.props.onIngredientAdded}></BuildControls>
        </React.Fragment>
      )
      orderSummary=<OrderSummary price={this.props.price}
      purchaseCancel={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinueHandler}
      ingredients={this.props.ings} ></OrderSummary>
   
    }
    // if(this.state.loading){
    //   orderSummary=<Spinner></Spinner>
    // }
  
    return(
      <React.Fragment>
          <Modal modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}>
            {orderSummary}
             </Modal>
          {burger}
      
      </React.Fragment> 


    );
  }

}
const mapStateToProps=state=>{
  return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuth:state.auth.token!==null
    
  }
    
}
const mapDispatchToProps=dispatch=>{
  return{
    onIngredientAdded:(ingName)=>dispatch(BurgerBuilderActionCreators.addIngredients(ingName)),
    onIngredientRemoved:(ingName)=>dispatch(BurgerBuilderActionCreators.removeIngredients(ingName)),
    onInitIngredients:()=>dispatch(BurgerBuilderActionCreators.initIngredients()),
    onInitPurchase:()=>dispatch(BurgerBuilderActionCreators.purchaseInit()),
    onSetAuthRedirectPath:(path)=>dispatch(BurgerBuilderActionCreators.setAuthRedirectPath(path))
  }
    
}
export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder,axios));
