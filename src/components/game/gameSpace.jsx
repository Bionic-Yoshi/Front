/* eslint-disable react/prefer-stateless-function,react/prop-types,react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import GridList from '@material-ui/core/GridList/GridList';
import GridListTile from '@material-ui/core/GridListTile/GridListTile';

import empty from '../../../static/assets/empty.png';

const tileData = [
  {
    title: 'Image2',
    checked: true,
    owner: 'x',
  },
  {
    title: 'Image1',
    checked: true,
    owner: 'o',
  },
  {
    title: 'Image4',
    checked: true,
    owner: 'x',
  },
  {
    title: 'Image7',
    author: 'author',
    checked: true,
    owner: 'o',
  },
  {
    title: 'Image72',
    checked: false,
    owner: 'n',
  },
  {
    title: 'Image82',
    checked: false,
    owner: 'n',
  },
  {
    title: 'Image245',
    checked: true,
    owner: 'o',
  },
  {
    title: 'Image843',
    checked: false,
    owner: 'n',
  },
  {
    title: 'Image48355',
    checked: false,
    owner: 'n',
  },
];

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 480,
  },
});

class GameSpace extends Component {
  render() {
    const { isFirstToPlay, nextPlayer } = this.props;

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList
          cellHeight={160}
          cols={3}
          spacing={0}
          className={classes.gridList}
        >
          {tileData.map(tile => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              style={{ display: 'flex' }}
              onClick={() => {
                nextPlayer(isFirstToPlay);
              }}
            >
              <GridListTile key={tile.title}>
                <img src={empty} alt="GameImg" />
              </GridListTile>
            </div>
          ))}
        </GridList>
      </div>
    );
  }
}

GameSpace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameSpace);
