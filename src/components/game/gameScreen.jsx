import React, { Component } from 'react';
import { compose } from 'redux';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import { withNamespaces } from 'react-i18next';

import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import CardActions from '@material-ui/core/CardActions/CardActions';

import connect from 'react-redux/es/connect/connect';
import DefeatGameDialog from './defeatGameDialog';
import QuitGameDialog from './quitGameDialog';
import VictoryGameDialog from './victoryGameDialog';
import GameSpace from './gameSpace';

import * as lobbyActions from '../../actions/lobby';

function allowNull(wrappedPropTypes) {
  return (props, propName, ...rest) => {
    if (props[propName] === null) return null;
    return wrappedPropTypes(props, propName, ...rest);
  };
}

class GameScreen extends Component {
  constructor(props) {
    super(props);

    props.getRoomFromSlug(props.match.params.slug);

    this.state = {
      open: false,
      openDefeat: false,
      openVictory: false,
      isFirstToPlay: true,
      tokenDecoded: jwtDecode(localStorage.getItem('token') || props.token),
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleQuit = () => {
    this.setState({ open: false });
    this.setState({ openDefeat: true });
  };

  handleCloseDefeat = () => {
    this.setState({ openDefeat: false });
  };

  handleQuitDefeat = () => {
    this.setState({ openDefeat: false });
  };

  handleCloseVictory = () => {
    this.setState({ openVictory: false });
  };

  handleQuitVictory = () => {
    this.setState({ openVictory: false });
  };

  nextPlayer = isFirstToPlay => {
    this.setState({ isFirstToPlay: !isFirstToPlay });
  };

  render() {
    const { t, currentRoom, isLoaded } = this.props;

    const {
      open,
      openDefeat,
      openVictory,
      isFirstToPlay,
      tokenDecoded,
    } = this.state;

    const propsQuitGameDialog = {
      open,
      handleClose: this.handleClose,
      handleQuit: this.handleQuit,
    };

    const propsDefeatGameDialog = {
      open: openDefeat,
      handleClose: this.handleCloseDefeat,
      handleQuit: this.handleQuitDefeat,
    };

    const propsVictoryGameDialog = {
      open: openVictory,
      handleClose: this.handleCloseVictory,
      handleQuit: this.handleQuitVictory,
    };

    const propsGameSpace = {
      isFirstToPlay,
      nextPlayer: this.nextPlayer,
      currentRoom,
      currentPlayer: tokenDecoded ? tokenDecoded.email : 'toto@email.com',
    };

    return (
      <div>
        <QuitGameDialog {...propsQuitGameDialog} />
        <DefeatGameDialog {...propsDefeatGameDialog} />
        <VictoryGameDialog {...propsVictoryGameDialog} />

        <Card raised>
          <CardContent style={{ textAlign: 'center' }}>
            <Typography component="h2" variant="h3" gutterBottom>
              {isLoaded ? currentRoom.title : 'Plirosi'}
            </Typography>
            <Typography variant="h4" gutterBottom>
              {isFirstToPlay ? 'Mine turn' : 'Your turn'}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={() => {
                this.handleClickOpen();
              }}
            >
              {t('button.gameQuit')}
            </Button>
          </CardActions>
        </Card>
        <br />
        <GameSpace {...propsGameSpace} />
      </div>
    );
  }
}

GameScreen.defaultProps = {
  currentRoom: null,
};

GameScreen.propTypes = {
  t: PropTypes.func.isRequired,
  currentRoom: allowNull(PropTypes.object),
};

const mapStateToProps = state => ({
  currentRoom: state.game.currentRoom,
  isLoaded: state.game.isLoaded,
});

const mapDispatchToProps = dispatch => ({
  getRoomFromSlug: slug => lobbyActions.getRoomFromSlug(slug)(dispatch),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withNamespaces('translation'),
);

export default enhance(GameScreen);
