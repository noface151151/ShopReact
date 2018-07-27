import { Modal, Button } from 'antd';
import React,{Component} from 'react';

class ModalComponent extends Component{

    state = {
        loading: false,
        visible: false,
      }
    componentWillMount(){
        console.log(this.props.visible);
        this.setState({visible:this.props.visible})
    }

    handleOk = () => {
        this.setState({ loading: true });
        this.props.handOK();
        this.setState({visible:false,loading:false})
      }
    handleCancel = () => {
        this.setState({ visible: false });
      }
    render(){
        const { visible, loading } = this.state;
        return(
            <div>
                <Modal
                    visible={visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>{this.props.cancelText}</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                        {this.props.SubmitText}
                        </Button>
                    ]}
                    >
                    {this.props.children}
                </Modal>
            </div>
        )
        
    }
}

export default ModalComponent;