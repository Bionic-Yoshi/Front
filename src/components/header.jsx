/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withNamespaces } from 'react-i18next';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';

import flagFr from '../../static/assets/if_flag-france.png';
import flagEn from '../../static/assets/if_flag-united-kingdom.png';
import * as socketActions from '../actions/socket';
import config from '../conf';

const W3CWebSocket = require('websocket').w3cwebsocket;

const styles = {
  hidden: { display: 'none' },
};

function allowNull(wrappedPropTypes) {
  return (props, propName, ...rest) => {
    if (props[propName] === null) return null;
    return wrappedPropTypes(props, propName, ...rest);
  };
}

class Header extends Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem('token')) {
      this.initSocket();
    }

    this.state = {
      isDefaultLng: props.i18n.language,
    };
  }

  componentDidUpdate(prevProps) {
    const { authenticated } = this.props;

    if (
      prevProps.authenticated === false &&
      authenticated !== prevProps.authenticated
    ) {
      this.initSocket();
    }

    if (
      prevProps.authenticated === true &&
      authenticated !== prevProps.authenticated
    ) {
      this.closeSocket();
    }
  }

  closeSocket = () => {
    const { socket, socketClose } = this.props;

    socketClose(socket);
  };

  initSocket = () => {
    const { sendEvent, socketConnected, socketInit } = this.props;

    if (localStorage.getItem('token')) {
      const client = new W3CWebSocket(config.webSocketUrl, 'echo-protocol');

      client.onerror = () => {
        console.log('Connection Error');
      };

      client.onopen = () => {
        console.log('WebSocket Client Connected');

        client.send(
          JSON.stringify({
            type: 'authenticate',
            payload: {
              token: localStorage.getItem('token').replace('JWT ', ''),
            },
          }),
        );
      };

      client.onclose = () => {
        socketConnected(false);
        console.log('echo-protocol Client Closed');
      };

      client.onmessage = e => {
        if (typeof e.data === 'string') {
          console.log(e.data);
          try {
            const event = JSON.parse(e.data);
            if (event.type && event.payload) {
              sendEvent(event.type, event.payload);
            }
            if (event.success && event.logged && event.logged === true) {
              socketConnected(true);
            }
            if (event.ping) {
              client.send('pong');
            }
          } catch (err) {
            console.log(err);
          }
        }
      };

      socketInit(client);
    }
  };

  renderLinks() {
    const { authenticated, t } = this.props;

    if (authenticated) {
      return [
        <li className="nav-item" key="lobby">
          <Link to="/lobby" className="navbar-brand">
            <Button color="inherit">
              <span style={{ color: '#FFFFFF' }}>{t('button.lobby')}</span>
            </Button>
          </Link>
        </li>,
        <li className="nav-item" key="profile">
          <Link to="/profile" className="navbar-brand">
            <Button color="inherit">
              <span style={{ color: '#FFFFFF' }}>{t('button.profile')}</span>
            </Button>
          </Link>
        </li>,
        <li className="nav-item" key="signOut">
          <Link to="/signout" className="navbar-brand">
            <Button color="inherit">
              <span style={{ color: '#FFFFFF' }}>{t('button.signout')}</span>
            </Button>
          </Link>
        </li>,
      ];
    }

    return [
      <li className="nav-item" key="signIn">
        <Link to="/signin" className="navbar-brand">
          <Button color="inherit">
            <span style={{ color: '#FFFFFF' }}>{t('button.signin')}</span>
          </Button>
        </Link>
      </li>,
      <li className="nav-item" key="signUp">
        <Link to="/signup" className="navbar-brand">
          <Button color="inherit">
            <span style={{ color: '#FFFFFF' }}>{t('button.signup')}</span>
          </Button>
        </Link>
      </li>,
    ];
  }

  render() {
    const { i18n, classes, wssconnected, authenticated, t } = this.props;

    const { isDefaultLng } = this.state;

    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
      this.setState({ isDefaultLng: isDefaultLng === 'fr' ? 'en' : 'fr' });
    };

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" className="navbar-brand">
              <Typography
                component="h2"
                variant="h3"
                gutterBottom
                style={{ color: 'white' }}
              >
                Plirosi
              </Typography>
            </Link>
            <div className={isDefaultLng === 'fr' ? classes.hidden : ''}>
              <Button onClick={() => changeLanguage('fr')}>
                <img src={flagFr} alt="French Flag" />
              </Button>
            </div>
            <div className={isDefaultLng === 'en' ? classes.hidden : ''}>
              <Button onClick={() => changeLanguage('en')}>
                <img src={flagEn} alt="English Flag" />
              </Button>
            </div>
            <ul className="nav navbar-nav">{this.renderLinks()}</ul>
            <div className={!authenticated ? classes.hidden : ''}>
              {/* console.log('You are already connected') */}
              <Button
                onClick={() =>
                  wssconnected ? this.closeSocket() : this.initSocket()
                }
                style={{
                  backgroundColor: wssconnected ? 'darkgreen' : 'firebrick ',
                  color: 'white',
                }}
              >
                {wssconnected
                  ? t('socket.connected')
                  : t('socket.disconnected')}
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        <br />
      </div>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  wssconnected: PropTypes.bool.isRequired,
  sendEvent: PropTypes.func.isRequired,
  socketConnected: PropTypes.func.isRequired,
  socketInit: PropTypes.func.isRequired,
  socket: allowNull(PropTypes.object.isRequired),
  socketClose: PropTypes.func.isRequired,
};

//
Header.defaultProps = {
  socket: null,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  wssconnected: state.websocket.connected,
  token: state.auth.token,
  socket: state.websocket.socket,
});

const mapDispatchToProps = dispatch => ({
  sendEvent: (type, payload) => dispatch({ type, payload }),
  socketConnected: value => socketActions.signinSocket(value)(dispatch),
  socketInit: value => socketActions.socketInit(value)(dispatch),
  socketClose: value => socketActions.socketClose(value)(dispatch),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withNamespaces('translation'),
  withStyles(styles),
);

export default enhance(Header);
