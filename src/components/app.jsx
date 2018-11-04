/* eslint-disable react/prefer-stateless-function,react/forbid-prop-types,func-names */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './header';

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <style>{'.sc-chat-window { z-index: 1000; }'}</style>
        <Header />
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.array.isRequired,
};

export default App;
