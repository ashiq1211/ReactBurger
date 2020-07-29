import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactDetails/ContactDetails';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
class Checkout extends Component{

    componentWillMount(){
       
    }
    // state={
    //     ingredients:null,
    //     totalPrice:0
    // }
    // componentWillMount(){
    //     const query=new URLSearchParams(this.props.location.search)
    //     const ingredients={}
    //     let price=0;
    //     for(let param of query.entries()){
    //         if(param[0]==='price'){
    //            price=param[1]
    //         }else{
    //             ingredients[param[0]]=+param[1]
    //         }
           
    //     }

    //     this.setState({ingredients:ingredients,totalPrice:price})
    // }
    
    checkoutCancelledHandler=()=>{
           this.props.history.goBack()
    }
    checkoutContinuedHandler=()=>{
         this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary=(<Redirect to='/'></Redirect>)
        if(this.props.ings){
            const purchasedRedirect=this.props.purchased?<Redirect to='/'></Redirect>:null
            summary=(
                <React.Fragment>
                           {purchasedRedirect}
                            <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler}
                            ingredients={this.props.ings} ></CheckoutSummary> 
                            <Route path={this.props.match.path+'/contact-data'} component={ContactData}></Route>
                        
                </React.Fragment>
            )
        }
        return (
           
            summary
        );
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
      
    }
}

export default connect(mapStateToProps) (Checkout);