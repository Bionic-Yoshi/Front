/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class VictoryGameDialog extends Component {
  render() {
    const { open, handleClose, handleQuit, t } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="victoryGame-dialog-title"
          aria-describedby="victoryGame-dialog-description"
        >
          <DialogTitle id="victoryGame-dialog-title">
            {t('game.victoryTitle')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="victoryGame-dialog-description">
              {t('game.victoryDesc')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/lobby">
              <Button onClick={handleQuit} color="primary">
                {t('button.lobby')}
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

VictoryGameDialog.propTypes = {
  t: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleQuit: PropTypes.func.isRequired,
};

const enhance = compose(withNamespaces('translation'));

export default enhance(VictoryGameDialog);
