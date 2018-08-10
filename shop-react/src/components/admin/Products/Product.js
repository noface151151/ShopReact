import React, { Component } from "react";
import { Table, Avatar, Icon, Spin, Form, Button } from "antd";
import axios from "../../../axios-order";
import AddEditProductForm from "../Products/AddEditProduct/AddEditProduct";

class ProductAdminComponent extends Component {
  state = {
    visible: false,
    titleAction: "Create",
    IsCreate: true
  };
  // componentWillMount(){
  //     console.log('componentWillMount Table')
  // }
  componentDidMount() {
    //  console.log('componentDidMount Table')
    //   this.props.onFetchProducts();
  }
  // componentDidUpdate(prevProps, prevState) {
  //     console.log('componentDidUpdate Table')
  // }
  // componentWillReceiveProps(nextProps){
  //     console.log('componentWillReceiveProps Table',nextProps)
  // }
  // componentWillUpdate(nextProps,nextState){
  //     console.log('componentWillUpdate Table')
  // }
  onCreateProduct = () => {
    this.setState({ titleAction: "Create", visible: true, IsCreate: true });
  };
  onUpdateProduct = record => {
    // console.log(record);
    const selectedProduct = {
      name: record.name,
      price: record.price,
      image: record.image,
      id: record.key
    };
    this.props.onSelectedProduct(selectedProduct);
    this.setState({ titleAction: "Edit", visible: true, IsCreate: false });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    //  console.log('render table')
    const columnsInit = [
      {
        title: "Product",
        dataIndex: "name"
      },
      {
        title: "Image",
        dataIndex: "image",
        align: "center",
        render: (text, row, index) => <Avatar size="large" src={text} />
      },
      {
        title: "Price",
        dataIndex: "price"
      },
      {
        title: "",
        dataIndex: "operation",
        render: (text, record) => {
          return this.props.products.length > 0 ? (
            <Button onClick={() => this.onUpdateProduct(record)} type="primary">
              Edit
            </Button>
          ) : null;
        }
      }
    ];
    let DrawerFormComponent = Form.create()(AddEditProductForm);
    if (this.props.productSelected !== null) {
      // console.log(this.props.productSelected)
      DrawerFormComponent = Form.create({
        mapPropsToFields(props) {
          //    console.log(props.fields)
          return {
            name: Form.createFormField({
              ...props.fields.name,
              value: props.fields.name.value
            }),
            price: Form.createFormField({
              ...props.fields.price,
              value: props.fields.price.value
            })
            //   name: Form.createFormField({
            //     ...props.selectedProduct.name,
            //     value: props.selectedProduct.name,
            //   }),
          };
        }
      })(AddEditProductForm);
    }
    //     const DrawerFormComponent=Form.create()(AddEditProductForm);

    if (this.props.loading) {
      const antIcon = <Icon type="loading" style={{ fontSize: 100 }} spin />;
      return <Spin indicator={antIcon} />;
    }
    let fields = null;
    if (this.props.productSelected !== null) {
      const productSelected = { ...this.props.productSelected };
      fields = {
        name: {
          value: productSelected.name
        },
        price: {
          value: productSelected.price
        }
      };
    }
    return (
      <div>
        <Button
          onClick={this.onCreateProduct}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add Product
        </Button>
        <Table
          dataSource={this.props.products}
          columns={columnsInit}
          scroll={{ x: 500 }}
        />
        <DrawerFormComponent
          fields={fields}
          visible={this.state.visible}
          titleAction={this.state.titleAction}
          onClose={() => this.onClose()}
          IsCreate={this.state.IsCreate}
        />
      </div>
    );
  }
}

export default ProductAdminComponent;
