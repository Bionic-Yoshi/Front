import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

import App from './components/app';
import Private from './components/private';
import reducers from './reducers';

import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import LobbyGrid from './components/lobby/lobbyGrid';
import ProfileUser from './components/profile/profileUser';
import GameScreen from './components/game/gameScreen';

import './i18n';
import registerServiceWorker from './registerServiceWorker';

let composeEnhancers;

if (process.NODE_ENV === 'production') {
  composeEnhancers = compose;
} else {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

// const createStoreWithMiddleware = composeEnchencers(createStore);
// const store = createStoreWithMiddleware();

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk)),
);

const token = localStorage.getItem('token');

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// If token then is signed in
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signout" component={Signout} />
        <Route exact path="/lobby" component={LobbyGrid} />
        <Route exact path="/profile" component={ProfileUser} />
        {/* <Route path="/profile/:name" component={ProfileUser} /> */}
        <Route exact path="/game/:slug" component={GameScreen} />
        <Route path="private" component={RequireAuth(Private)} />
      </App>
    </Router>
  </Provider>,
  document.querySelector('.container'),
);

registerServiceWorker();
