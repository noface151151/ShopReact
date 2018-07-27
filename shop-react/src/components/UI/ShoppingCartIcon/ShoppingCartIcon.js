import React,{Component} from 'react';
import { Badge,Button } from 'antd';
import {connect} from 'react-redux';


class ShoppingCartIcon extends Component{

    render(){
        return(
            <div>
                <Badge style={{ backgroundColor: '#52c41a' }} count={this.props.totalQuantityShoppingCart}>
                    <Button type="primary" shape="circle" icon="shopping-cart" />
                </Badge>
          </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        totalQuantityShoppingCart:state.shoppingCart.totalQuantity
    }
}
export default connect(mapStateToProps,null)(ShoppingCartIcon);
