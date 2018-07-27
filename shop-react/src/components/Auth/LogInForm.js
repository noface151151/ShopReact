import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;


class LoginForm extends Component{
  state = {
    confirmDirty: false
  };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
           // console.log(values)
            this.props.submit(values.email,values.password)
          }
        });
      }
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      }
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['passwordcomfirm'], { force: true });
        }
        callback();
      }
    render(){
      const { getFieldDecorator } = this.props.form;
      let itemPassword= (
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              {validator: this.validateToNextPassword}],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
      ) 
      let button = (
        <div>
           <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
        </div>
      )
      if(this.props.isRegister){
        
        itemPassword=(
            <div>
               <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' },
                    {validator: this.validateToNextPassword}],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('passwordcomfirm', {
                    rules: [{ required: true, message: 'Please input Password Comfirm!' },
                            {validator: this.compareToFirstPassword}],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password Comfirm" />
                  )}
                </FormItem>
            </div>
        )

        button =(
          <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
            Regiter
          </Button>
        )
      }

      
        return(
          <div style={{textAlign:'center'}}>
            <Form  onSubmit={this.handleSubmit} >
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
              {itemPassword}
            <FormItem>
              {button}
            </FormItem>
          </Form>
          </div>
        )
        
    }
}

export default LoginForm;