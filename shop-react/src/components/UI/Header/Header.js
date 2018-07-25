import React, {Component} from 'react';
import { Layout, Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';

const  Header = Layout.Header;

class HeaderComponent extends Component{

    render(){
        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['0']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key={0}> 
                    <NavLink exact={true} to="/" >Home</NavLink>
                </Menu.Item >
                <Menu.Item key={1} >
                    <NavLink  to="/ShoppingCart" >Shopping Cart</NavLink>
                </Menu.Item >

                <Menu.Item key={3} style={{float:'right'}}> 
                    <ShoppingCartIcon />
                </Menu.Item >
            </Menu>
            </Header>
        )
    }
}

export default HeaderComponent