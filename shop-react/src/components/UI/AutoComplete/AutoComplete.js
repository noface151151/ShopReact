import React, { Component } from "react";
import { Icon, Button, Input, AutoComplete } from "antd";
import { withRouter } from "react-router-dom";
import "./AutoComplete.css";
const Option = AutoComplete.Option;

class AutoCompleteCustom extends Component {
  state = {
    dataSource: []
  };
  componentDidMount() {
    //console.log('didmount')
   // this.setState({ dataSource: this.props.dataSource });
  }
  onSelect = value => {
    this.props.history.push(value);
  };

  renderOption = item => {
   // this.setState({ dataSource: this.props.dataSource });
    return (
      <Option key={item.id} value={item.value}>
        {item.name}
      </Option>
    );
  };
  searchResult = name => {
    const dataSourceCopy = this.props.dataSource;
    return dataSourceCopy.filter(val => {
      return val.name.includes(name);
    });
  };
  handleSearch = value => {
    this.setState({
      dataSource: value ? this.searchResult(value) : []
    });
  };
  render() {
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        <AutoComplete
          className="global-search"
          size="large"
          style={{ width: "100%" }}
          dataSource={this.state.dataSource.map(this.renderOption)}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="input here"
          optionLabelProp="text"
        >
          <Input
            suffix={
              <Button className="search-btn" size="large" type="primary">
                <Icon type="search" />
              </Button>
            }
          />
        </AutoComplete>
      </div>
    );
  }
}

export default withRouter(AutoCompleteCustom);
