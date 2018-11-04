/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for,react/forbid-prop-types */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

import { withNamespaces } from 'react-i18next';

import { withStyles } from '@material-ui/core';
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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type} />
    {touched && error && <span className="text-danger">{error}</span>}
  </fieldset>
);

class Signup extends Component {
  handleFormSubmit(values) {
    const { signupUser } = this.props;

    signupUser(values);
  }

  renderAlert() {
    const { errorMessage, t } = this.props;

    if (errorMessage) {
      return (
        <div className="alert alert-danger" role="alert">
          <strong>{`${t('error')}:`}</strong> {errorMessage}
        </div>
      );
    }
    return <div />;
  }

  render() {
    const { handleSubmit, classes, isAuth, t } = this.props;

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
              <Field
                name="email"
                component={renderField}
                type="email"
                label={`${t('input.email')}:`}
              />
              <Field
                name="password"
                component={renderField}
                type="password"
                label={`${t('input.password')}:`}
              />
              <Field
                name="passwordConfirm"
                component={renderField}
                type="password"
                label={`${t('input.confpassword')}:`}
              />
            </CardContent>
            <CardActions className={classes.centerForm}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                {t('button.signup')}
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

Signup.defaultProps = {
  errorMessage: '',
};

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
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

const reduxFormSignUp = reduxForm({
  form: 'signup',
  validate,
})(Signup);

const enhance = compose(
  connect(
    mapStateToProps,
    actions,
  ),
  withStyles(styles),
  withNamespaces('translation'),
);

export default enhance(reduxFormSignUp);
