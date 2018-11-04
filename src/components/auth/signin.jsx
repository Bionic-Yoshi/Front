/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for,react/forbid-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

import { withNamespaces } from 'react-i18next';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper/Paper';

import * as actions from '../../actions';

import gameLogo from '../../../static/assets/gameLogo.png';

const styles = {
  centerForm: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: 500,
  },
  paperStyle: {
    marginTop: 10,
    height: 100,
    width: 100,
    textAlign: 'center',
    display: 'inline-block',
    overflow: 'hidden',
    borderRadius: '50%',
  },
};

class Signin extends Component {
  fieldInput = field => (
    <div>
      <input {...field.input} type={field.type} className="form-control" />
    </div>
  );

  handleFormSubmit({ email, password }) {
    // Handle the sign in
    const { signinUser } = this.props;

    signinUser({ email, password });
  }

  renderAlert() {
    const { errorMessage, t } = this.props;

    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>{t('error')} : </strong> {errorMessage}
        </div>
      );
    }
    return <div />;
  }

  render() {
    const { classes, handleSubmit, isAuth, t } = this.props;

    return isAuth ? (
      <Redirect to="/lobby" />
    ) : (
      <div>
        {this.renderAlert()}
        <form
          onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          className={classes.centerForm}
        >
          <Card raised className={classes.card}>
            <div className={classes.centerForm}>
              <Paper className={classes.paperStyle}>
                <img
                  src={gameLogo}
                  alt="Logo"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Paper>
            </div>

            <CardContent>
              <fieldset className="form-group">
                <label>{t('input.email')}:</label>
                <Field type="text" name="email" component={this.fieldInput} />
              </fieldset>
              <fieldset className="form-group">
                <label>{t('input.password')}:</label>
                <Field
                  type="password"
                  name="password"
                  component={this.fieldInput}
                />
              </fieldset>
            </CardContent>
            <CardActions className={classes.centerForm}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                {t('button.signin')}
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    );
  }
}

Signin.defaultProps = {
  errorMessage: '',
};

Signin.propTypes = {
  signinUser: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    isAuth: state.auth.authenticated,
  };
}

const reduxFormSignIn = reduxForm({
  form: 'signin',
})(Signin);

export default connect(
  mapStateToProps,
  actions,
)(withStyles(styles)(withNamespaces('translation')(reduxFormSignIn)));
