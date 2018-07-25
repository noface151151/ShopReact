import React, {Component} from 'react';
import { Layout } from 'antd';

const  Footer = Layout.Footer;

class FooterComponent extends Component{
    render(){
        return(
            <Footer style={{ textAlign: 'center' }}>
               Demo ReactJs with Ant Design
            </Footer>
        )
    }
}

export default FooterComponent;