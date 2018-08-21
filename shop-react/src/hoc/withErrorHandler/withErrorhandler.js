import {Modal} from 'antd';
import React,{Component} from 'react';
import Wrap from '../Wrap/Wrap';
const withErrorHandler =(WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null
        }

        componentWillMount(){
          this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })
            this.resInterceptor =  axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            })
            
        }
        componentWillUpdate(nextProps,nextState){
         //   console.log(nextStates)
            if(nextState.error!==null){
                Modal.error({
                    title: 'Error',
                    content: nextState.error.message,
                    onOk:this.errorComfirmedHandler()
                  });
            }
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorComfirmedHandler=()=>{
            this.setState({error:null});
        }
        render(){
            
        return (       
            <Wrap>     
                <WrappedComponent {...this.props} />
            </Wrap>  
            )
        }
    }
}

export default  withErrorHandler;