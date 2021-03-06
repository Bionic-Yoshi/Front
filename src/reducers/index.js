import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth_reducer';
import lobby from './lobby_reducer';
import websocket from './socket_reducer';
import game from './game_reducer';
import message from './message_reducer';

const rootReducer = combineReducers({
  form,
  auth,
  lobby,
  websocket,
  game,
  message,
});

export default rootReducer;
