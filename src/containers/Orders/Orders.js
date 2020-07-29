import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    
    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId)
        
    }

    render() { 
        let fetchedOrders=<Spinner></Spinner>
        
        if(!this.props.loading){
            
            
            fetchedOrders=
            this.props.orders.map(order=>{
                 return <Order price={order.price}
                 ingredients={order.ingredients}
               key={+order.id}></Order>
                 })
             
            
        }
        return ( 
            <div>{
                fetchedOrders}</div>
          
         );
    }
}
const mapStateToProps=state=>{
    return{
      orders:state.order.orders,
      loading:state.order.loading,
      token:state.auth.token,
      userId:state.auth.userId
    }
}
const mapDispatchToProps=dispatch=>{
    return{

        onFetchOrders:(token,userId)=>dispatch(actionCreators.fetchOrders(token,userId))
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps) (errorHandler(Orders,axios));