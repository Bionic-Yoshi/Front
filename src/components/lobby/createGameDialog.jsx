/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withNamespaces } from 'react-i18next';

import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import TextField from '@material-ui/core/TextField/TextField';
import connect from 'react-redux/es/connect/connect';

class CreateGameDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomTitle: '',
    };
  }

  render() {
    const { roomTitle } = this.state;
    const { open, handleClickClose, handleCreate, t } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {t('lobby.createroomtitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{t('lobby.createroomdesc')}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t('input.roomname')}
            type="text"
            value={roomTitle}
            fullWidth
            onChange={event => {
              this.setState({ roomTitle: event.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCreate(roomTitle);
            }}
            color="primary"
          >
            {t('button.create')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CreateGameDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClickClose: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { rooms: state.lobby.rooms };
}

const enhance = compose(
  connect(
    mapStateToProps,
    null,
  ),
  withNamespaces('translation'),
);

export default enhance(CreateGameDialog);
