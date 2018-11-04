/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import Typography from '@material-ui/core/Typography/Typography';

import * as actions from '../../actions';

import gameLogo from '../../../static/assets/gameLogo.png';

class Signout extends Component {
  UNSAFE_componentWillMount() {
    const { signoutUser } = this.props;

    signoutUser();
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Typography component="h2" variant="h1" gutterBottom>
          You've been disconnected!
        </Typography>
        <img
          src={gameLogo}
          alt="Logo"
          style={{ width: '30%', height: 'auto' }}
        />

        <br />
        <br />
        <Divider />
        <br />

        <div className="row">
          <Link to="/">
            <Button variant="outlined" color="inherit">
              Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

Signout.propTypes = {
  signoutUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  actions,
)(Signout);
