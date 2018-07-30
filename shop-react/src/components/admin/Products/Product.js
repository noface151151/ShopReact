import React ,{Component} from 'react';
import { Table, Avatar,Icon,Spin,Form, Button } from 'antd';
import axios from '../../../axios-order';
import AddEditProductForm from '../Products/AddEditProduct/AddEditProduct';

class ProductAdminComponent extends Component {

    state={
        visible: false,
        titleAction:'Create'
    }
    componentDidMount(){
        this.props.onFetchProducts();
    }

    onCreateProduct=()=>{
        this.setState({titleAction:'Create',visible:true})
    }
    onUpdateProduct=()=>{
        this.setState({titleAction:'Edit',visible:true})
    }
    onClose = () => {
        this.setState(
          {
            visible: false,
          }
        );
      };
    render(){
        const columnsInit =[{
            title: 'Product',
            dataIndex: 'name',
        },{
            title:'Image',
            dataIndex: 'image',
            align:'center',
            render:(text,row,index)=><Avatar size="large" src={text} />
        },{
            title:'Price',
            dataIndex:'price',
        },{
          title: '',
          dataIndex: 'operation',
          render: (text, record) => {
            return (
              this.props.products.length  > 0
                ? (
                   <Button type="primary">Edit</Button>
                ) : null
            );
          },
        }]; 

        const DrawerFormComponent=Form.create()(AddEditProductForm);
        
        if(this.props.loading){
            const antIcon = <Icon type="loading" style={{ fontSize: 100 }} spin />;
            return <Spin indicator={antIcon} />; 
        }
         return (
            <div>
                 <Button onClick={this.onCreateProduct} type="primary" style={{ marginBottom: 16 }}>
                    Add Product
                </Button>
                <Table dataSource={this.props.products} columns={columnsInit} />
                <DrawerFormComponent 
                    visible={this.state.visible} 
                    titleAction={this.state.titleAction} 
                    onClose={this.onClose}/>
            </div>
            ); 
    } 
}

export default ProductAdminComponent; 