import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";

import ShoppingCartIcon from "../ShoppingCartIcon/ShoppingCartIcon";
import requiredAuthComponent from "../../../hoc/requiredAuth/requiredAuth";
import MenuItemsConfig from "../../../shared/ConfigMenu";
import AutoCompleteCustom from "../AutoComplete/AutoComplete";

const Header = Layout.Header;

class HeaderComponent extends Component {
  render() {
    const menuItemsFillter = MenuItemsConfig.filter(el => {
      if (this.props.isAuthenticated) {
        return el.showAuth === true;
      }
      return el.isRequiredAuth === false;
    }).map(val => (
      <Menu.Item key={val.path}>
        <NavLink exact={val.isExact} to={val.path}>
          {val.itemName}
        </NavLink>
      </Menu.Item>
    ));
    let menuDataSource = [];
    const MenuItemsFilter = MenuItemsConfig.filter(el => {
      if (this.props.isAuthenticated) {
        return el.showAuth === true;
      }
      return el.isRequiredAuth === false;
    });
   // console.log(MenuItemsFilter);
    for (let i = 0; i < MenuItemsFilter.length; i++) {
      const val = MenuItemsFilter[i];
      const item = {
        id: val.path,
        name: val.itemName,
        value: val.path,
        isExact: val.isExact
      };
      menuDataSource.push(item);
    }
    const { href } = this.props;
    const hrefFix = href.split("/")[3];
    return (
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/" + hrefFix]}
          selectedKeys={["/" + hrefFix]}
          style={{ lineHeight: "64px" }}
        >
          {menuItemsFillter}
          <Menu.Item key={5}>
            <AutoCompleteCustom dataSource={menuDataSource} />
          </Menu.Item>
          <Menu.Item key={6} style={{ float: "right" }}>
            <ShoppingCartIcon />
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default requiredAuthComponent(HeaderComponent);
