import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Spin, Icon } from 'antd';

import Products from '../../components/Products/Products';
import * as  action from '../../store/actions/index';


class ProductContainer extends Component{


    componentDidMount(){
        this.props.onFetchProducts();
     }

     AddShoppingCart=(product)=>{
        console.log(product.id)
        console.log(this.props.shoppingCarts)
         if(product){
            const checkShoppingCart=this.props.shoppingCarts.find(shoppingCart=>{
                return shoppingCart.productId===product.id;
            })
            console.log(checkShoppingCart)
            if(checkShoppingCart){
                this.props.onUpdateShoppingCart(checkShoppingCart.quantity+1,checkShoppingCart.totalPrice+product.price,checkShoppingCart.id) ;   
            }else{
                const newId = this.props.shoppingCarts.length;
                const shoppingCart={
                    productId:product.id,
                    name:product.name,
                    quantity:1,
                    price:product.price,
                    totalPrice:product.price,
                    image:product.image
                }
               this.props.onAddShoppingCart(shoppingCart,newId);
            }
           
         }
       
     }

    render(){
         const antIcon = <Icon type="loading" style={{ fontSize: 100 }} spin />;
        let products=<Spin indicator={antIcon} />;
       
        if(!this.props.loading){
            
            products=
                    <div>
                        <Products clicked={(product)=>{this.AddShoppingCart(product)}} products={this.props.products}/>
                    </div>
        }
        return(
            products    
        )
    }
}

const mapStateToProps=state=>{
    return{
        products:state.product.products,
        loading:state.product.loading,
        shoppingCarts:state.shoppingCart.shoppingCarts
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onFetchProducts:()=>dispatch(action.Product_GetList()),
        onAddShoppingCart:(shoppingCart,id)=>dispatch(action.ShoppingCart_Add(shoppingCart,id)),
        onUpdateShoppingCart:(quantity,totalPrice,id) =>dispatch(action.ShoppingCart_Update(quantity,totalPrice,id))
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(ProductContainer);