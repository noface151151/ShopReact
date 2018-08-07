import React, { Component } from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux';

import LayoutCustom from './hoc/Layout/LayoutCustom';
//import ProductContainer from './containers/ProductContainer/ProductContainer';
//import ShoppingCart from './containers/ShoppingCartContainer/ShoppingCartContainer';
//import LoginContainer from './containers/Auth/LoginContainer';
//import RegisterContainer from './containers/Auth/RegisterContainer';
import LogoutContainer from './containers/Auth/Logout';
//import ProductAdminContainer from './containers/admin/Products/Product';
//import ProductAdminComponent from './components/admin/Products/Product';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import './App.css';

const asyncHome=asyncComponent(()=>{
  return import('./containers/ProductContainer/ProductContainer')
})
const asyncShoppingCart=asyncComponent(()=>{
  return import('./containers/ShoppingCartContainer/ShoppingCartContainer')
})
const asyncLogin=asyncComponent(()=>{
  return import('./containers/Auth/LoginContainer')
})
const asyncRegister=asyncComponent(()=>{
  return import('./containers/Auth/RegisterContainer')
})
// const asyncLogout=asyncComponent(()=>{
//   return import('./containers/Auth/Logout')
// })
const asyncProductAdmin=asyncComponent(()=>{
  return import('./containers/admin/Products/Product')
})

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoLogin();
  }

  render() {
    let href=window.location.href.split('/');
    href=href[3];

    let router = null;
     if(!this.props.isAuthenticated){
      router = (
        <Switch>
          <Route path="/Home" exact component={asyncHome} />
          <Route path="/ShoppingCart" component ={asyncShoppingCart} />
          <Route path="/LogIn" component ={asyncLogin} />
          <Route path="/Register" component ={asyncRegister} />
          <Route path="/" exact component={asyncHome} />
          <Redirect to="/"/>
        </Switch>
      )
     }else{ 
      
      router=(
        <Switch>
          <Route path="/Home" exact component={asyncHome} />
          <Route path="/ShoppingCart" component ={asyncShoppingCart} />
          <Route path="/ProductAdmin" component ={asyncProductAdmin} />
          <Route path="/Logout" component ={LogoutContainer} />
          <Route path="/" exact component={asyncHome} />
     
        </Switch>
      )
    }
    console.log(this.props.isAuthenticated)
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
