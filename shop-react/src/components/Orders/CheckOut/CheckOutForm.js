import React ,{Component} from 'react';

import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;



class CheckOutForm extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              this.props.handleOrder(values)
            console.log('Received values of form: ', values);
          }
        });
      }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Your Name" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your Email!' }],
                })(
                  <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Your Email" />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: 'Please input your address!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Address" />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: 'Please input your phone number!' },
                          { pattern: /^[0-9\b]+$/,message:'Phone number must be a number'}],
                })(
                  <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Phone Number" />
                )}
              </FormItem>

              <FormItem>
                <Button type="primary" htmlType="submit">
                  Order
                </Button>
              </FormItem>
            </Form>
          );
    }
}

export default CheckOutForm;
