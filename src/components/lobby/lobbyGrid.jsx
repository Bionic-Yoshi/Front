/* eslint-disable react/forbid-prop-types */

import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import { withNamespaces } from 'react-i18next';

import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import GridList from '@material-ui/core/GridList/GridList';
import GridListTile from '@material-ui/core/GridListTile/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar/GridListTileBar';
import Typography from '@material-ui/core/Typography/Typography';

import { Launcher } from 'react-chat-window';
import moment from 'moment';
import CreateGameDialog from './createGameDialog';
import JoinGameDialog from './joinGameDialog';

import * as lobbyActions from '../../actions/lobby';

import gameLogo from '../../../static/assets/gameLogo.png';
// import message from '../../reducers/message_reducer';

function allowNull(wrappedPropTypes) {
  return (props, propName, ...rest) => {
    if (props[propName] === null) return null;
    return wrappedPropTypes(props, propName, ...rest);
  };
}

class LobbyGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openCreate: false,
      openJoin: false,
      tokenDecoded: jwtDecode(localStorage.getItem('token') || props.token),
      roomTarget: null,
    };
  }

  componentDidMount() {
    const { fetchRoom } = this.props;

    fetchRoom();
  }

  createGameHandleClickOpen = () => {
    this.setState({ openCreate: true });
  };

  createGameHandleClose = () => {
    this.setState({ openCreate: false });
  };

  createGameHandleCreate = roomTitle => {
    const { addRoom } = this.props;

    this.setState({ openCreate: false });
    addRoom(roomTitle);
  };

  joinGameHandleClickOpen = roomTarget => {
    this.setState({ openJoin: true, roomTarget });
  };

  joinGameHandleClose = () => {
    this.setState({ openJoin: false });
  };

  joinGameHandleJoin = slug => {
    const { joinRoom } = this.props;

    if (slug !== null) joinRoom(slug);
    this.setState({ openJoin: false, roomTarget: null });
  };

  _onMessageWasSent(message) {
    const { wssconnected, socket, addMessageLobby } = this.props;
    const { tokenDecoded } = this.state;

    console.log(message);
    addMessageLobby(message);

    let messageToSend = null;

    if (message.type === 'text') {
      messageToSend = JSON.stringify({
        type: 'lobbyMessage',
        payload: {
          author: tokenDecoded.email,
          type: 'text',
          data: { text: message.data.text },
        },
      });
    }

    if (message.type === 'emoji') {
      messageToSend = JSON.stringify({
        type: 'lobbyMessage',
        payload: {
          author: tokenDecoded.email,
          type: 'emoji',
          data: { emoji: message.data.emoji },
        },
      });
    }

    // eslint-disable-next-line no-param-reassign
    if (wssconnected && socket && messageToSend) {
      socket.send(messageToSend);
    }

    // this.setState({
    //   messageList: [...messageList, message],
    // });
  }

  // _sendMessage(text) {
  //   const { messageList } = this.state;
  //
  //   if (text.length > 0) {
  //     this.setState({
  //       messageList: [
  //         ...messageList,
  //         {
  //           author: 'them',
  //           type: 'text',
  //           data: { text },
  //         },
  //       ],
  //     });
  //   }
  // }

  render() {
    const { openCreate, openJoin, tokenDecoded, roomTarget } = this.state;

    const { t, rooms, lobbyMessageList } = this.props;

    const propsCreateGameDialog = {
      open: openCreate,
      handleClickClose: this.createGameHandleClose,
      handleCreate: this.createGameHandleCreate,
    };

    const propsJoinGameDialog = {
      open: openJoin,
      handleClickClose: this.joinGameHandleClose,
      handleJoin: this.joinGameHandleJoin,
      roomTarget,
    };

    return (
      <div>
        <div style={{ zIndex: 10000 }}>
          <Launcher
            agentProfile={{
              teamName: 'Polirosi Lobby',
              // imageUrl: gameLogo,
            }}
            onMessageWasSent={e => {
              this._onMessageWasSent(e);
            }}
            messageList={lobbyMessageList}
            showEmoji
          />
        </div>
        <CreateGameDialog {...propsCreateGameDialog} />

        <JoinGameDialog {...propsJoinGameDialog} />
        <Card raised>
          <CardContent style={{ textAlign: 'center' }}>
            <Typography component="h2" variant="h1" gutterBottom>
              {t('button.lobby')}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {t('lobby.description')}
            </Typography>
          </CardContent>
        </Card>
        <br />
        <br />
        <GridList cellHeight={180} cols={4} spacing={5}>
          <GridListTile key="AddGame">
            <img src={gameLogo} alt="NewGame" />
            <GridListTileBar
              title={t('lobby.createroomtiletitle')}
              subtitle={t('lobby.createroomtiledesc')}
              actionIcon={
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: 20 }}
                  onClick={() => {
                    this.createGameHandleClickOpen();
                  }}
                >
                  {t('button.create')}
                </Button>
              }
            />
          </GridListTile>
          {rooms.map(room => {
            const { player2, owner } = room;
            const isInRoom =
              tokenDecoded.email === owner || tokenDecoded.email === player2;
            return (
              <GridListTile key={room.slug}>
                <img src={gameLogo} alt={room.slug} />
                <GridListTileBar
                  title={room.title}
                  subtitle={
                    <span>
                      {t('lobby.created')}: {moment(room.submitDate).fromNow()}
                    </span>
                  }
                  actionIcon={
                    isInRoom ? (
                      <Link to={room.isFull ? `/game/${room.slug}` : '/'}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: 20 }}
                          disabled={!room.isFull}
                        >
                          {t('button.connect')}
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="contained"
                        color="default"
                        style={{ marginRight: 20 }}
                        onClick={() => {
                          this.joinGameHandleClickOpen(room);
                        }}
                      >
                        {t('button.join')}
                      </Button>
                    )
                  }
                />
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}

LobbyGrid.defaultProps = {
  rooms: [],
  error: '',
  token: '',
  socket: null,
};

LobbyGrid.propTypes = {
  t: PropTypes.func.isRequired,
  fetchRoom: PropTypes.func.isRequired,
  rooms: PropTypes.array,
  error: PropTypes.string,
  token: PropTypes.string,
  sizerooms: PropTypes.number.isRequired,
  wssconnected: PropTypes.bool.isRequired,
  socket: allowNull(PropTypes.object.isRequired),
  lobbyMessageList: PropTypes.array.isRequired,
  addMessageLobby: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  rooms: state.lobby.rooms,
  error: state.lobby.error,
  sizerooms: state.lobby.size,
  wssconnected: state.websocket.connected,
  socket: state.websocket.socket,
  lobbyMessageList: state.message.lobbyMessageList,
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

export default enhance(LobbyGrid);
