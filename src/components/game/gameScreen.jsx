/* eslint-disable react/prefer-stateless-function,react/no-unescaped-entities */
import React, { Component } from 'react';
import { compose } from 'redux';
// import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import { withNamespaces } from 'react-i18next';

import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import CardActions from '@material-ui/core/CardActions/CardActions';

import DefeatGameDialog from './defeatGameDialog';
import QuitGameDialog from './quitGameDialog';
import VictoryGameDialog from './victoryGameDialog';
import GameSpace from './gameSpace';

class GameScreen extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      open: false,
      openDefeat: false,
      openVictory: false,
      // tokenDecoded: jwtDecode(localStorage.getItem('token') || props.token),
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

  render() {
    const { t } = this.props;

    const { open, openDefeat, openVictory } = this.state;

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

    return (
      <div>
        <QuitGameDialog {...propsQuitGameDialog} />
        <DefeatGameDialog {...propsDefeatGameDialog} />
        <VictoryGameDialog {...propsVictoryGameDialog} />

        <Card raised>
          <CardContent style={{ textAlign: 'center' }}>
            <Typography component="h2" variant="h3" gutterBottom>
              RoomName
            </Typography>
            <Typography variant="h4" gutterBottom>
              It's $$$'s turn
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
        <GameSpace />
      </div>
    );
  }
}

GameScreen.propTypes = {
  t: PropTypes.func.isRequired,
};

const enhance = compose(withNamespaces('translation'));

export default enhance(GameScreen);
