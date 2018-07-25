import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Spin,Button } from 'antd';
import  {Redirect} from 'react-router-dom'

import ShoppingCartTable from '../../components/ShoppingCart/ShoppingCartTable/ShoppingCartTable';
import * as action from '../../store/actions/index';
import HeaderEnum from '../../shared/HeaderEnum';
class ShoppingCartContainer extends Component{

    updateQuantity=(quantity,id)=>{
        const checkShoppingCart=this.props.shoppingCarts.find(shoppingCart=>{
            return shoppingCart.id===id;
        })
        if(checkShoppingCart){
            console.log(quantity);
            this.props.onUpdateShoppingCart(quantity,quantity*checkShoppingCart.price,checkShoppingCart.id) ; 
        }  
    }
    deleteShoppingCart=(id)=>{
        this.props.onDeleteShoppingCart(id);
    }

    addOrder=()=>{
        const orderData={
            productInfo:this.props.shoppingCarts,
            totalQuantity:this.props.totalQuantity,
            totalPrice:this.props.totalPrice
        }
        this.props.onAddOrder(orderData);

    }
    render(){
        let authRedirect= null;
        if(this.props.isComplete && !this.props.loading ){
            this.props.onSetSelectedItem(HeaderEnum['home']);
            authRedirect=<Redirect to="/"/>
        }
        
        return(
            <div>
                {authRedirect}
                <Spin spinning={this.props.loading}> </Spin>
                <ShoppingCartTable 
                    updateQuantity={(quantity,id)=>this.updateQuantity(quantity,id)} 
                    deleteShoppingCart={(id)=>this.deleteShoppingCart(id)}
                    datasource={this.props.shoppingCarts} 
                    totalPrice={this.props.totalPrice}
                    totalQuantity={this.props.totalQuantity}/>
                
                <Button onClick={()=>this.addOrder()} 
                disabled={this.props.shoppingCarts.length>0?false:true} 
                style={{marginTop:'10px',float:'right'}} type="primary">Order</Button>
                

            </div>
            
        )
    }
}

const mapStateToProps=state=>{
    return{
        shoppingCarts:state.shoppingCart.shoppingCarts,
        totalPrice:state.shoppingCart.totalPrice,
        totalQuantity:state.shoppingCart.totalQuantity,
        loading:state.order.loading,
        isComplete:state.order.isComplete
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onUpdateShoppingCart:(quantity,totalPrice,id) =>dispatch(action.ShoppingCart_Update(quantity,totalPrice,id)),
        onDeleteShoppingCart:(id) =>dispatch(action.ShoppingCart_Delete(id)),
        onAddOrder:(orderData)=>dispatch(action.Order_Add(orderData)),
        onSetSelectedItem:(key)=>dispatch(action.setSelectedKey(key))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingCartContainer);