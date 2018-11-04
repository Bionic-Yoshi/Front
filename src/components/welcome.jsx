/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import { withNamespaces } from 'react-i18next';

import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import Typography from '@material-ui/core/Typography/Typography';

import gameLogo from '../../static/assets/gameLogo.png';

class Welcome extends Component {
  render() {
    const { isAuth, t } = this.props;

    return isAuth ? (
      <Redirect to="/lobby" />
    ) : (
      <div style={{ textAlign: 'center' }}>
        <Typography component="h2" variant="h1" gutterBottom>
          {t('welcome')}
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
          <div className="col-md-5">
            <Link to="/signin">
              <Button variant="outlined" color="inherit">
                {t('button.signin')}
              </Button>
            </Link>
          </div>
          <div className="col-md-2">
            <Typography variant="h5" gutterBottom>
              {t('or')}
            </Typography>
          </div>

          <div className="col-md-5">
            <Link to="/signup">
              <Button variant="outlined" color="inherit">
                {t('button.signup')}
              </Button>
            </Link>
          </div>
        </div>

        <br />
        <Divider />
        <br />
      </div>
    );
  }
}

Welcome.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuth: state.auth.authenticated,
  };
}

const enhance = compose(
  connect(mapStateToProps),
  withNamespaces('translation'),
);

export default enhance(Welcome);
