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

function allowNull(wrappedPropTypes) {
  return (props, propName, ...rest) => {
    if (props[propName] === null) return null;
    return wrappedPropTypes(props, propName, ...rest);
  };
}

class JoinGameDialog extends Component {
  getTitle = room => {
    if (room) return room.title;
    return 'name';
  };

  render() {
    const { open, handleClickClose, handleJoin, t, roomTarget } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="join-dialog-title"
      >
        <DialogTitle id="join-dialog-title">
          {this.getTitle(roomTarget)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{t('lobby.joinroomdesc')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleJoin(roomTarget.slug)} color="primary">
            {t('button.join')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

JoinGameDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClickClose: PropTypes.func.isRequired,
  handleJoin: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  roomTarget: allowNull(PropTypes.object.isRequired),
};

JoinGameDialog.defaultProps = {
  roomTarget: null,
};

const enhance = compose(withNamespaces('translation'));

export default enhance(JoinGameDialog);
