import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
const requiredAuthComponent = WrappedComponent => {
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoLogin: () => dispatch(actions.authCheckState())
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {
      componentWillMount() {
        this.props.onTryAutoLogin();
      }
      render() {
        return (
          <WrappedComponent
            isAuthenticated={this.props.isAuthenticated}
            {...this.props}
          />
        );
      }
    }
  );
};

export default requiredAuthComponent;
