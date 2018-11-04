/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withNamespaces } from 'react-i18next';

import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardActions from '@material-ui/core/CardActions/CardActions';
import CardContent from '@material-ui/core/CardContent/CardContent';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';

class ProfileUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      pwd: '',
    };
  }

  render() {
    const { username, email, pwd } = this.state;
    const { t } = this.props;

    return (
      <div className="row">
        <div className="col-md-6">
          <Card raised>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {t('profile.yourinfo')}
              </Typography>
              <TextField
                id="outlined-name"
                label={t('input.name')}
                value={username}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={event => {
                  this.setState({ username: event.target.value });
                }}
              />
              <br />
              <TextField
                id="outlined-name"
                label={t('input.email')}
                value={email}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={event => {
                  this.setState({ email: event.target.value });
                }}
              />
              <br />
              <TextField
                id="outlined-name"
                label={t('input.password')}
                value={pwd}
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={event => {
                  this.setState({ pwd: event.target.value });
                }}
              />
            </CardContent>
            <CardActions style={{ justifyContent: 'center' }}>
              <Button variant="outlined">{t('button.edit')}</Button>
            </CardActions>
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Stats
              </Typography>
              win
              <br />
              lose
              <br />
              tie
            </CardContent>
            <CardActions>
              <Button variant="outlined">{t('button.edit')}</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

ProfileUser.propTypes = {
  t: PropTypes.func.isRequired,
};

const enhance = compose(withNamespaces('translation'));

export default enhance(ProfileUser);
