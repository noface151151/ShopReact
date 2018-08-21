import React, { Component } from "react";
import { Table, Button, Popconfirm, Form, Avatar, Modal } from "antd";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";
import CheckOutForm from "../../Orders/CheckOut/CheckOutForm";
import {
  EditableCell,
  EditableFormRow
} from "../../UI/Table/EditableCell/EditableCell";
import "./ShoppingCartTable.css";

class ShoppingCartTable extends Component {
  state = {
    visible: false,
    loading: false
  };
  handleSave = row => {
    this.props.updateQuantity(row.quantity, row.id);
  };
  handleDelete = row => {
    console.log(row.id);
    this.props.deleteShoppingCart(row.id);
  };

  //handle Modal
  openModalHandle = () => {
    if (!this.props.isAuthenticated) {
      this.props.onSetAuthRedirectPath("/ShoppingCart");
      this.props.onRedirectLogin();
    } else {
      this.setState({ visible: true });
    }
  };
  handleOrder = ordersInfo => {
    this.setState({ loading: true });
    this.props.addOrder(ordersInfo);
    this.setState({ visible: false, loading: false });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
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
        title: "Quantity",
        dataIndex: "quantity",
        editable: true
      },
      {
        title: "Price",
        dataIndex: "price"
      },
      {
        title: "Total Amount",
        dataIndex: "totalPrice"
      },
      {
        title: "",
        dataIndex: "operation",
        render: (text, record) => {
          return this.props.datasource.length > 0 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null;
        }
      }
    ];
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    //console.log(EditableRow)

    const columns = columnsInit.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          inputType: col.dataIndex === "quantity" ? "number" : "text"
        })
      };
    });

    const WrappedCheckOutForm = Form.create()(CheckOutForm);
    return (
      <div>     
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={this.props.datasource}
          columns={columns}
          title={() => "Your Shopping Cart"}
          footer={() => (
            <div>
              Total: {this.props.totalPrice}
              <Button
                onClick={this.openModalHandle}
                disabled={this.props.datasource.length > 0 ? false : true}
                style={{ float: "right" }}
                type="primary"
              >
                {this.props.isAuthenticated
                  ? "Check out"
                  : "Login to continue checkout"}
              </Button>
              <Modal
                visible={this.state.visible}
                title="Check out"
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" onClick={this.handleCancel}>
                    Cancel
                  </Button>
                ]}
              >
                <WrappedCheckOutForm
                  handleOrder={orderInfo => {
                    this.handleOrder(orderInfo);
                  }}
                />
              </Modal>
            </div>
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
