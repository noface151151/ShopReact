import React,{Component} from 'react';
import { Drawer, Form, Button, Col, Row, Input,Spin,notification } from 'antd';
import UploadImage from '../../../UI/UploadImage/UploadImage';
import {Desktop,Tablet,Mobile,Default} from '../../../../hoc/Responsive/Responsive';

class AddEditProductForm extends Component{
    state = { imageUrl: null };

   
  
      onSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
          //  console.log(this.state.imageUrl)
            const product={
              name:values.name,
              price:values.price,
              image:this.state.imageUrl
            }
         //   console.log(product);
            this.props.AddProduct(product);
            this.props.onClose();
          }
        });
      }
      onClose = () => {
      //  this.setState({visible:false})
        this.props.onClose();
      };
      setImageUrl=(imageUrl)=>{
        this.setState({imageUrl:imageUrl})
      //  console.log(this.state.imageUrl)
      }
     
      render() {
        const { getFieldDecorator } = this.props.form;
        
       
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
            <Button onClick={this.onSubmit} type="primary">Submit</Button>
          </div>
        </div>
        )

        return (
         <div>
           <Spin spinning={this.props.loadingAddEdit}> </Spin>
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
