import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch, Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';
 class App extends Component {
   componentDidMount(){
     this.props.onTryAutoSignUp()
   }
  render() {
    let routes=(
      <Switch>
     
        <Route path='/' exact component={BurgerBuilder}></Route>
        
        <Route  path='/auth' component={Auth}></Route>
       
           <Redirect to='/'></Redirect>
      </Switch>)
    if(this.props.isAuth){
      routes=(
        
        <Switch>
          <Route  path='/orders' component={Orders}></Route>
          <Route path='/' exact component={BurgerBuilder}></Route>
          <Route  path='/checkout' component={Checkout}></Route>
          <Route path='/logout'  component={Logout}></Route>
          <Route  path='/auth' component={Auth}></Route>
          <Redirect to='/'></Redirect>
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
           
         {routes}
         </Layout>          
      </div>
    );
  }
}
const mapStateToProps=state=>{
  return{
    isAuth:state.auth.token!==null
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignUp:()=>dispatch(actionCreators.authCheckState())
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (App);



