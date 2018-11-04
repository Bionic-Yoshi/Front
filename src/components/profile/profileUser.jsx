/* eslint-disable no-useless-escape */

import React, { Component } from 'react';
import { compose } from 'redux';
import jwtDecode from 'jwt-decode';

import PropTypes from 'prop-types';

import { withNamespaces } from 'react-i18next';

import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardActions from '@material-ui/core/CardActions/CardActions';
import CardContent from '@material-ui/core/CardContent/CardContent';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import connect from 'react-redux/es/connect/connect';
import * as lobbyActions from '../../actions/lobby';

class ProfileUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokenDecoded: jwtDecode(localStorage.getItem('token') || props.token),
      email: '',
      pwd: 'Bien essayé :3',
      newPwd: '',
    };
  }

  componentDidMount() {
    const { tokenDecoded } = this.state;

    this.setState({
      email: tokenDecoded ? tokenDecoded.email : 'sample@gmail.com',
    });
  }

  changePassword() {
    const { newPwd } = this.state;

    console.log(newPwd);
  }

  changeEmail() {
    const { email } = this.state;

    console.log(email);
  }

  render() {
    const { tokenDecoded, email, pwd, newPwd } = this.state;
    const { t } = this.props;

    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValidToChangeEmail =
      tokenDecoded.email !== email && emailPattern.test(String(email));

    const isPasswordValid = newPwd !== '' && pwd === newPwd;

    return (
      <Card raised>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {t('profile.yourinfo')}
          </Typography>
          <TextField
            id="email"
            label={t('input.email')}
            value={email}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={event => {
              this.setState({ email: event.target.value });
            }}
          />
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              variant="outlined"
              disabled={!isValidToChangeEmail}
              onClick={() => {
                this.changeEmail();
              }}
            >
              {t('button.edit')}
            </Button>
          </CardActions>
          <br />
          <TextField
            id="psw"
            label={t('input.password')}
            value={pwd}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={event => {
              this.setState({ pwd: event.target.value });
            }}
            type="password"
          />
          <TextField
            id="new psw"
            label={t('input.confpassword')}
            value={newPwd}
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={event => {
              this.setState({ newPwd: event.target.value });
            }}
            type="password"
          />
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            disabled={!isPasswordValid}
            onClick={() => {
              this.changePassword();
            }}
          >
            {t('button.edit')}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

ProfileUser.defaultProps = {
  token: '',
};

ProfileUser.propTypes = {
  t: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  fetchRoom: () => lobbyActions.fetchRoom()(dispatch),
  addRoom: roomTitle => lobbyActions.addRoom(roomTitle)(dispatch),
  joinRoom: slug => lobbyActions.joinRoom(slug)(dispatch),
  addMessageLobby: value => dispatch({ type: 'lobbyMessage', payload: value }),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withNamespaces('translation'),
);

export default enhance(ProfileUser);
