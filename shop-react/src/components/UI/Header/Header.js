import React, {Component} from 'react';
import { Layout, Menu } from 'antd';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import ShoppingCartIcon from '../ShoppingCartIcon/ShoppingCartIcon';
import * as action from '../../../store/actions/index';


const  Header = Layout.Header;

class HeaderComponent extends Component{

    setSelectKey=({ item, key, selectedKeys })=>{
        this.props.onSetSelectedItem(key);
    }

    render(){
        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['0']}
                style={{ lineHeight: '64px' }}
                selectedKeys={this.props.itemSelected}
                onSelect ={()=>this.setSelectKey}	
            >
                <Menu.Item key={0}> 
                    <NavLink exact={true} to="/" >Home</NavLink>
                </Menu.Item >
                <Menu.Item key={1} >
                    <NavLink  to="/ShoppingCart" >Shopping Cart</NavLink>
                </Menu.Item >

                <Menu.Item key={2} style={{float:'right'}}> 
                    <ShoppingCartIcon />
                </Menu.Item >
            </Menu>
            </Header>
        )
    }
}
const mapStateToProps=state=>{
    return{
        itemSelected:state.headerItem.itemSelected
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onSetSelectedItem:(key)=>dispatch(action.setSelectedKey(key))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComponent)