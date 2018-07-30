import React, {Component} from 'react';
import { Layout, Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';


const  Header = Layout.Header;

class HeaderComponent extends Component{

    setSelectKey=({ item, key, selectedKeys })=>{
        this.props.onSetSelectedItem(key);
    }

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
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}

export default connect(mapStateToProps,null)(HeaderComponent)