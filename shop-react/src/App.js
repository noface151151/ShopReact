import React, { Component } from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux';

import LayoutCustom from './hoc/Layout/LayoutCustom';
import ProductContainer from './containers/ProductContainer/ProductContainer';
import ShoppingCart from './containers/ShoppingCartContainer/ShoppingCartContainer';
import LoginContainer from './containers/Auth/LoginContainer';
import RegisterContainer from './containers/Auth/RegisterContainer';
import LogoutContainer from './containers/Auth/Logout';
import ProductAdminContainer from './containers/admin/Products/Product';
import * as actions from './store/actions/index';
import './App.css';


class App extends Component {

  componentDidMount(){
    this.props.onTryAutoLogin();
  }

  render() {
    let href=window.location.href.split('/')
    href=href[3]
   let router = (
        <Switch>
          <Route path="/Home" exact component={ProductContainer} />
          <Route path="/ShoppingCart" component ={ShoppingCart} />
          <Route path="/LogIn" component ={LoginContainer} />
          <Route path="/Register" component ={RegisterContainer} />
          <Route path="/" exact component={ProductContainer} />
          <Redirect to="/"/>
        </Switch>
   )
    if(this.props.isAuthenticated){
      router=(
        <Switch>
           <Route path="/Home" exact component={ProductContainer} />
          <Route path="/ShoppingCart" component ={ShoppingCart} />
          <Route path="/LogIn" component ={LoginContainer} />
          <Route path="/Register" component ={RegisterContainer} />
          <Route path="/Logout" component ={LogoutContainer} />
          <Route path="/ProductAdmin" component ={ProductAdminContainer} />
          <Route path="/" exact component={ProductContainer} />
          <Redirect to="/"/>
        </Switch>
      )
    }
    return (
      <div className="App">
         <LayoutCustom href={href}>
          {router}
          </LayoutCustom>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    isAuthenticated:state.auth.token!==null
  }
}

const mapDispatchToProps =dispatch=>{
  return {
    onTryAutoLogin:()=>dispatch(actions.authCheckState())
  }
} 

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
