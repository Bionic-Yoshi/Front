/* eslint-disable react/prefer-stateless-function,react/prop-types,react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import GridList from '@material-ui/core/GridList/GridList';
import GridListTile from '@material-ui/core/GridListTile/GridListTile';

import empty from '../../../static/assets/empty.png';
// import x from '../../../static/assets/x.png';
// import o from '../../../static/assets/o.png';

const tileData = [
  {
    title: 'Image2',
    author: 'author',
    checked: true,
    type: 'x',
  },
  {
    title: 'Image1',
    author: 'author',
    checked: true,
    type: 'o',
  },
  {
    title: 'Image4',
    author: 'author',
    checked: true,
    type: 'x',
  },
  {
    title: 'Image7',
    author: 'author',
    checked: true,
    type: 'o',
  },
  {
    title: 'Image72',
    author: 'author',
    checked: false,
    type: 'n',
  },
  {
    title: 'Image82',
    author: 'author',
    checked: false,
    type: 'n',
  },
  {
    title: 'Image245',
    author: 'author',
    checked: true,
    type: 'o',
  },
  {
    title: 'Image843',
    author: 'author',
    checked: false,
    type: 'n',
  },
  {
    title: 'Image48355',
    author: 'author',
    checked: false,
    type: 'n',
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
            <GridListTile key={tile.title}>
              <img src={empty} alt="GameImg" />
            </GridListTile>
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
