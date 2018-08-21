import React,{Component} from 'react';
import { Layout, Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon'
const { Sider } = Layout;

class SiderComponent extends Component{

    render(){
        const {href} = this.props;
        const hrefFix = href.split('/')[3]
        let MenuItems=(
            <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/'+hrefFix]}
            selectedKeys={['/'+hrefFix]}
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
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                >
                {MenuItems}
            </Sider>
        )
    }
}

export default SiderComponent;