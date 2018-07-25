import React, { Component } from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'; 

import LayoutCustom from './hoc/Layout/LayoutCustom';
import ProductContainer from './containers/ProductContainer/ProductContainer';
import ShoppingCart from './containers/ShoppingCartContainer/ShoppingCartContainer';
import './App.css';


class App extends Component {

 

  render() {
    let routes=(
      <Switch>
        {/* <Route path="/Product" component={ProductContainer} /> */}
        <Route path="/ShoppingCart" component ={ShoppingCart} />
        <Route path="/" component={ProductContainer} />
        <Redirect to='/' />
      </Switch>
    )
    return (
      <div className="App">
         <LayoutCustom>
            {routes}
          </LayoutCustom>
      </div>
    );
  }
}

export default App;
