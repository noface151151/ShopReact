import React,{Component} from 'react';
import { Layout, Breadcrumb } from 'antd';

import HeaderComponent from '../../components/UI/Header/Header';
import FooterComponent from '../../components/UI/Footer/Footer';
import SiderComponent from '../../components/UI/Sider/Sider';
import MediaQuery from 'react-responsive';
const {  Content } = Layout;

class LayoutCustom extends Component{
   
    render(){

        const ContentAndFooter=(
            <div>
                 <Content style={{ padding: '0 50px', marginTop: 64}}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 550 }}>
                        {this.props.children}
                    </div>
                </Content>
                <FooterComponent />
            </div>
        )
        let LayoutResponsive=(
            <MediaQuery maxDeviceWidth={1224}>
                {(matches) => {
                if (matches) {
                    return (

                        <Layout>
                            <SiderComponent />
                            <Layout>
                                {ContentAndFooter} 
                            </Layout>
                        </Layout>
                    )
                } else {
                    return(
                        <Layout>
                            <HeaderComponent />  
                            {ContentAndFooter}
                        </Layout>
                    ) 
                }
                }}
            </MediaQuery>
        );
        return(
            LayoutResponsive
        )
    }
}

export default LayoutCustom;