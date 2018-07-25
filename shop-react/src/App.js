import React, { Component } from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'; 

import LayoutCustom from './hoc/Layout/LayoutCustom';
import ProductContainer from './containers/ProductContainer/ProductContainer';
import ShoppingCart from './containers/ShoppingCartContainer/ShoppingCartContainer';
import './App.css';


class App extends Component {

 

  render() {
    
    return (
      <div className="App">
         <LayoutCustom>
         <Switch>
            <Route path="/ShoppingCart" component ={ShoppingCart} />
            <Route path="/" exact component={ProductContainer} />
            <Redirect to="/"/>
        </Switch>
          </LayoutCustom>
      </div>
    );
  }
}

export default withRouter(App);
