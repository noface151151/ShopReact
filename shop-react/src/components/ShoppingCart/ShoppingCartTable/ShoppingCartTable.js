import React, { Component } from "react";
import {
  Table,
  Input,
  InputNumber,
  Button,
  Popconfirm,
  Form,
  Avatar,
  Modal
} from "antd";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import CheckOutForm from "../../Orders/CheckOut/CheckOutForm";
import "./ShoppingCartTable.css";

const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false
  };

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener("click", this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener("click", this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  handleClickOutside = e => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  };

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };
  getInput = () => {
    if (this.props.inputType === "number") {
      return (
        <InputNumber
          ref={node => (this.input = node)}
          onPressEnter={this.save}
        />
      );
    }
    return <Input ref={node => (this.input = node)} onPressEnter={this.save} />;
  };
  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      inputType,
      ...restProps
    } = this.props;

    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`
                      }
                    ],
                    initialValue: record[dataIndex]
                  })(this.getInput())}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

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
