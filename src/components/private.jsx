import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';

class Private extends Component {
  UNSAFE_componentWillMount() {
    const { fetchMessage } = this.props;

    fetchMessage();
  }

  render() {
    const { message } = this.props;

    return <div>{message}</div>;
  }
}

Private.defaultProps = {
  message: '',
};

Private.propTypes = {
  fetchMessage: PropTypes.func.isRequired,
  message: PropTypes.string,
};

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(
  mapStateToProps,
  actions,
)(Private);
