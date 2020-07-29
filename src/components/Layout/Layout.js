import React,{Component} from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import './Layout.css'
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';
class Layout extends Component{
  state={
    showSideDrawer:false
  }
  sideDrawerCloseHandler=()=>{
    this.setState({showSideDrawer:false})
  }
  showDrawerHandler=()=>{
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }
  render() {
    return (
      <React.Fragment>
      <SideDrawer  token={this.props.token}  
      open={this.state.showSideDrawer}
      closed={this.sideDrawerCloseHandler} ></SideDrawer>
      <Toolbar token={this.props.token}
      showDrawerClicked={this.showDrawerHandler}
       ></Toolbar>
       <main className={"Content"}>{this.props.children}</main>
     </React.Fragment>
    );
  }
}
const mapStateToProps=state=>{
  return{
    token:state.auth.token!==null
  }
}
export default connect(mapStateToProps) (Layout);
