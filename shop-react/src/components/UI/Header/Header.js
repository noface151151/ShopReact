import React, {Component} from 'react';
import { Layout, Menu,Icon } from 'antd';
import {NavLink} from 'react-router-dom';

import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';
import requiredAuthComponent from '../../../hoc/requiredAuth/requiredAuth';

const {SubMenu } = Menu;
const  Header = Layout.Header;

class HeaderComponent extends Component{

    render(){
        let MenuItems=(
            <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/'+this.props.href]}
            selectedKeys={['/'+this.props.href]}
            style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="/"> 
                    <NavLink exact={true} to="/" >Home</NavLink>
                </Menu.Item >
                <Menu.Item key="/ShoppingCart" >
                    <NavLink  to="/ShoppingCart" >Shopping Cart</NavLink>
                </Menu.Item >
                <Menu.Item key="/LogIn" >
                    <NavLink  to="/LogIn" >Login</NavLink>
                </Menu.Item >
                <Menu.Item key="/Register" >
                    <NavLink  to="/Register" >Register</NavLink>
                </Menu.Item >
                <Menu.Item key={5} style={{float:'right'}}> 
                    <ShoppingCartIcon />
                </Menu.Item >
            </Menu>
        )
        if(this.props.isAuthenticated){
            MenuItems=(
                <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['/'+this.props.href]}
                selectedKeys={['/'+this.props.href]}
                style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="/"> 
                        <NavLink exact={true} to="/" >Home</NavLink>
                    </Menu.Item >
                    <Menu.Item key="/ShoppingCart" >
                        <NavLink  to="/ShoppingCart" >Shopping Cart</NavLink>
                    </Menu.Item >
                    <Menu.Item key="/ProductAdmin" >
                        <NavLink  to="/ProductAdmin" >Product Management</NavLink>
                    </Menu.Item >
                    <Menu.Item key="/Logout"  >
                        <NavLink  to="/Logout" >Logout</NavLink>
                    </Menu.Item >
                    <Menu.Item key={5} style={{float:'right'}}> 
                        <ShoppingCartIcon />
                    </Menu.Item >
                </Menu>
            )
        }
        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                {MenuItems}
            </Header>
        )
    }
}

export default requiredAuthComponent(HeaderComponent);