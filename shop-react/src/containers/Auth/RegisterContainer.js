import React, {Component} from 'react';
import {message, Form,Spin} from 'antd';
import {connect} from 'react-redux';
import  {Redirect} from 'react-router-dom'

import RegisterForm from '../../components/Auth/LogInForm';
import * as  action from '../../store/actions/index';

class Register extends Component{


    register=(email,password)=>{
      //  console.log(email)
        this.props.onRegister(email,password);
    }

    render(){
        let authRedirect=null;
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to={this.props.authRedirectPath}/>
        }
        let errorMessage=null;
        if(this.props.error){
            message.error(this.props.error.message,2);
        }
     //   console.log(this.props.loading)
        const WrappedRegisterForm = Form.create()(RegisterForm);
        return(
          <div>
            {authRedirect}
            {errorMessage}
          <Spin spinning={this.props.loading}> </Spin>
          <WrappedRegisterForm submit={(email,password)=>{this.register(email,password)}} isRegister={true}/>
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
        onRegister:(email,password)=>dispatch(action.auth(email,password,true))
      
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register);