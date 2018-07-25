import React,{Component} from 'react';
import { Layout, Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon'
const { Sider } = Layout;

class SiderComponent extends Component{

    render(){
        return(
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                    <Menu.Item key={0}> 
                        <NavLink exact={true} to="/" >Home</NavLink>
                    </Menu.Item >
                    <Menu.Item key={1} >
                        <NavLink  to="/ShoppingCart" >Shopping Cart</NavLink>
                    </Menu.Item >
                    <Menu.Item key={3}  > 
                        <ShoppingCartIcon />
                    </Menu.Item >
                </Menu>
            </Sider>
        )
    }
}

export default SiderComponent;