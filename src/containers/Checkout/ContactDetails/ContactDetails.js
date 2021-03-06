import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactDetails.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { elementType, element } from 'prop-types';
import { connect } from 'react-redux';
import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import  * as  actionCreators from '../../../store/actions/index';
class ContactDetails extends Component {
    state = { 
        orderForm:{
          name:{
            elementType:'input',
            elementConfig:{
              type:'text',
              placeholder:'Your name'
            },
            value:'',
            validation:{
              required:true
            },
            valid:false,
            touched:false
          },
          email:{
            elementType:'input',
            elementConfig:{
              type:'email',
              placeholder:'Your email'
            },
            value:'',
            validation:{
              required:true,
              isEmail:true
            },
            valid:false,
            touched:false
          },
          street:{
            elementType:'input',
            elementConfig:{
              type:'text',
              placeholder:'Your street'
            },
            value:'',
            validation:{
              required:true,
              minLength:6
            },
            valid:false,
            touched:false
          },
          pin:{
            elementType:'input',
            elementConfig:{
              type:'number',
              placeholder:'Your PIN'
            },
            value:'',
            validation:{
              required:true
            },
            valid:false,
            touched:false
          },
          deliveryMethod:{
            value:'cheapest',
            elementType:'select',
            elementConfig:{
            options:[{value:'fastest' ,displayValue:'Fastest'},
            {value:'cheapest' ,displayValue:'Cheapest'}
          ]
            },
           validation:{},
            valid:true,
           
          }

        },
        formIsValid:false,

       
     }
     checkValidity(value, rules) {
      let isValid = true;
      if (!rules) {
          return true;
      }
      
      if (rules.required) {
          isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid
      }

      if (rules.isEmail) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid
      }

      if (rules.isNumeric) {
          const pattern = /^\d+$/;
          isValid = pattern.test(value) && isValid
      }

      return isValid;
  }

     inputChangeHandler=(event,inputIdentifier)=>{
            const updatedOrderForm={
              ...this.state.orderForm
            }
            const updateFormElement={
              ...updatedOrderForm[inputIdentifier]
            }
            updateFormElement.value=event.target.value
            updateFormElement.valid=this.checkValidity(updateFormElement.value,updateFormElement.validation)
            updateFormElement.touched=true;
            updatedOrderForm[inputIdentifier]=updateFormElement
            let formIsValid=true
            for(let inputIdentifiers in updatedOrderForm){
              formIsValid=updatedOrderForm[inputIdentifiers].valid && formIsValid
            }
          
            this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})

     }
    orderHandler=(event)=>{
        event.preventDefault()
        
         const formData={}
         for(let formElement in this.state.orderForm){
           formData[formElement]=this.state.orderForm[formElement]
         }
    const order={
      ingredients:this.props.ings,
      price:this.props.price,
      customerData:formData,
      userId:this.props.userId

    }
    this.props.onOrderBurger(order,this.props.token)
   

    }
    render() { 

        const formElmentArray=[]
        for(let key in this.state.orderForm){
          formElmentArray.push({
            id:key,
            config:this.state.orderForm[key]
          })
        }
        let form =( <form onSubmit={this.orderHandler}>
          {formElmentArray.map(formElement=>(
             <Input key={formElement.id} touched={formElement.config.touched} shouldValidate={formElement.config.validation} invalid={!formElement.config.valid} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} changed={(event)=>this.inputChangeHandler(event,formElement.id)}></Input>
          ))}
            
            
            <Button btnType='Success' disabled={!this.state.formIsValid} >ORDER</Button>
         </form>)

        if(this.props.loading){
            form=<Spinner></Spinner>
        }
        return ( 
          <div className='ContactDetails'>
              <h4>Enter Your Contact Data</h4>
             {form}

          </div>  
         );
    }
}
const mapStateToProps=state=>{
  return{
      ings:state.burgerBuilder.ingredients,
      price:state.burgerBuilder.totalPrice,
      loading:state.order.loading,
      token:state.auth.token,
      userId:state.auth.userId
    
  }
}
const mapDispatchToProps=dispatch=>{
  return{
      onOrderBurger:(orderData,token)=>dispatch(actionCreators.purchaseBurger(orderData,token))
  }
}
 
export default connect(mapStateToProps,mapDispatchToProps) (errorHandler(ContactDetails,axios));