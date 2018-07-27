import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Spin } from 'antd';
import ShoppingCartTable from '../../components/ShoppingCart/ShoppingCartTable/ShoppingCartTable';
import * as action from '../../store/actions/index';
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

    onRedirectLogin=()=>{
        this.props.history.push('/LogIn');
    }

    addOrder=(orderInfo)=>{
        const orderData={
            productInfo:this.props.shoppingCarts,
            orderInfo:{
                name: orderInfo.name,
                email:orderInfo.email,
                address: orderInfo.address,
                phone: orderInfo.phone
            },
            totalQuantity:this.props.totalQuantity,
            totalPrice:this.props.totalPrice
        }
        this.props.onAddOrder(orderData);

    }
    render(){        
        return(
            <div>
              
                <Spin spinning={this.props.loading}> </Spin>
                <ShoppingCartTable 
                    updateQuantity={(quantity,id)=>this.updateQuantity(quantity,id)} 
                    deleteShoppingCart={(id)=>this.deleteShoppingCart(id)}
                    addOrder = {(orderInfo)=>this.addOrder(orderInfo)}
                    onRedirectLogin={this.onRedirectLogin}
                    datasource={this.props.shoppingCarts} 
                    totalPrice={this.props.totalPrice}
                    totalQuantity={this.props.totalQuantity}/>
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