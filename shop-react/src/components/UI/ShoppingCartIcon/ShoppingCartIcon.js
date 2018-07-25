import React,{Component} from 'react';
import { Badge, Icon,Button } from 'antd';

class ShoppingCartIcon extends Component{

    render(){
        return(
            <div>
                <Badge style={{ backgroundColor: '#52c41a' }} count={5}>
                    <Button type="primary" shape="circle" icon="shopping-cart" />
                </Badge>
          </div>
        )
    }
}

export default ShoppingCartIcon;
