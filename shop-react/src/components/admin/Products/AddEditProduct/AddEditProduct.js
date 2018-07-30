import React,{Component} from 'react';
import { Drawer, Form, Button, Col, Row, Input,InputNumber } from 'antd';
import Responsive from 'react-responsive';
import UploadImage from '../../../UI/UploadImage/UploadImage';

class AddEditProductForm extends Component{
    state = { imageUrl: null };
    
    // componentWillMount(){
    //     this.setState({visible:this.props.visible});
    // }
      // showDrawer = () => {
      //   this.setState({
      //     visible: true,
      //   });
      // };
    
      onClose = () => {
        // this.setState(
        //   {
        //     visible: false,
        //   }
        // );
        this.props.onClose();
      };
      setImageUrl=(imageUrl)=>{
        this.setState({imageUrl:imageUrl})
      }
      render() {
        const { getFieldDecorator } = this.props.form;
        let image = null;
        if(this.state.imageUrl){
          image= <img alt="example" src={this.state.imageUrl}/>;
        }
        const form=(
          <div>
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  <Col span={12}>
                      <Form.Item label="Product Name">
                      {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'please enter Product Name' }],
                      })(<Input placeholder="please enter Product Name" />)}
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Product Price">
                      {getFieldDecorator('price', {
                      rules: [{ required: true, message: 'please enter Product Price' }],
                      })(<Input stype={{width:'100%'}} placeholder="please enter Product Price" />)}
                      </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <UploadImage setImageUrl={(imageUrl)=>this.setImageUrl(imageUrl)}/>
                        {image}

                    </Col>
                </Row>
          </Form>
          <div
          style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
          }}
          >
            <Button
                style={{
                marginRight: 8,
                }}
                onClick={this.onClose}
            >
                Cancel
            </Button>
            <Button onClick={this.onClose} type="primary">Submit</Button>
          </div>
        </div>
        )
        const Desktop = props => <Responsive {...props} minWidth={992} />;
        const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
        const Mobile = props => <Responsive {...props} maxWidth={767} />;
        const Default = props => <Responsive {...props} minWidth={768} />;
      

        return (
         <div>
           <Desktop>
                <Drawer
                      title={this.props.titleAction}
                      width={720}
                      placement="right"
                      onClose={this.onClose}
                      maskClosable={false}
                      visible={this.props.visible}
                      style={{
                      height: 'calc(100% - 55px)',
                      overflow: 'auto',
                      paddingBottom: 53,
                      }}>
                      {form} 
                </Drawer>
           </Desktop>
           <Tablet>
            <Drawer
                        title={this.props.titleAction}
                        width={520}
                        placement="right"
                        onClose={this.onClose}
                        maskClosable={false}
                        visible={this.props.visible}
                        style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53,
                        }}>
                        {form} 
                </Drawer>
           </Tablet>
           <Mobile>
           <Drawer
                        title={this.props.titleAction}
                        width={320}
                        placement="right"
                        onClose={this.onClose}
                        maskClosable={false}
                        visible={this.props.visible}
                        style={{
                        height: 'calc(100% - 55px)',
                        overflow: 'auto',
                        paddingBottom: 53,
                        }}>
                        {form} 
                </Drawer>
           </Mobile>
           <Default>
           <Drawer
                      title={this.props.titleAction}
                      width={720}
                      placement="right"
                      onClose={this.onClose}
                      maskClosable={false}
                      visible={this.props.visible}
                      style={{
                      height: 'calc(100% - 55px)',
                      overflow: 'auto',
                      paddingBottom: 53,
                      }}>
                      {form} 
                </Drawer>
           </Default>
         </div>
        )
      }

}
export default AddEditProductForm;
