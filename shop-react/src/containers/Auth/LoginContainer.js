import React, {Component} from 'react';
import {message,Spin, Form} from 'antd';
import {connect} from 'react-redux';
import  {Redirect} from 'react-router-dom';

import LoginForm from '../../components/Auth/LogInForm';
import * as  action from '../../store/actions/index';


class LoginContainer extends Component{

    login=(email,password)=>{
        //  console.log(email)
          this.props.onLogin(email,password);
      }
    render(){
       const WrappedLoginForm = Form.create()(LoginForm);
       let authRedirect=null;
       if(this.props.isAuthenticated){
           authRedirect=<Redirect to={this.props.authRedirectPath}/>
       }
       let errorMessage=null;
       if(this.props.error){
           message.error(this.props.error.message,4);
       }
        return(
          <div>
            {authRedirect}
            {errorMessage}
          <Spin spinning={this.props.loading}> </Spin>
          <WrappedLoginForm submit={(email,password)=>{this.login(email,password)}} isRegister={false}/>
          </div>
        )
        
    }
}

const mapStateToProps=state=>{
    return{
        token:state.auth.token,
        userId: state.auth.userId,
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated:state.auth.token!==null,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onLogin:(email,password)=>dispatch(action.auth(email,password,false))
      
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer);