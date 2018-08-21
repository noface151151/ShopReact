import React, { Component } from "react";
import { Layout } from "antd";
import MediaQuery from "react-responsive";
import HeaderComponent from "../../components/UI/Header/Header";
import FooterComponent from "../../components/UI/Footer/Footer";
import SiderComponent from "../../components/UI/Sider/Sider";
import BreadcrumbComponent from "../../components/UI/Breadcrumb/Breadcrumb";

const { Content } = Layout;

class LayoutCustom extends Component {
  render() {
    const ContentAndFooter = (
      <div>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
            <BreadcrumbComponent href ={this.props.href}/>
          <div style={{ background: "#fff", padding: 24, minHeight: 550 }}>
            {this.props.children}
          </div>
        </Content>
        <FooterComponent />
      </div>
    );
    let LayoutResponsive = (
      <MediaQuery maxDeviceWidth={1224}>
        {matches => {
          if (matches) {
            return (
              <Layout>
                <SiderComponent href={this.props.href} />
                <Layout>{ContentAndFooter}</Layout>
              </Layout>
            );
          } else {
            return (
              <Layout>
                <HeaderComponent href={this.props.href} />
                {ContentAndFooter}
              </Layout>
            );
          }
        }}
      </MediaQuery>
    );
    return LayoutResponsive;
  }
}

export default LayoutCustom;
