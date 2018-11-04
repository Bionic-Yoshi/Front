/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Enhanced / Higher Order Component

export default function(ComposedComponent) {
  class Authentication extends Component {
    UNSAFE_componentWillMount() {
      const { authenticated, context } = this.props;

      if (!authenticated) {
        context.router.push('/');
      }
    }

    UNSAFE_componentWillUpdate(nextProps) {
      const { context } = this.props;

      // Updates when a component gets an updated set of props
      if (!nextProps.authenticated) {
        context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  Authentication.propTypes = {
    context: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
  };

  return connect(mapStateToProps)(Authentication);
}
