/* eslint-disable no-unused-vars */
import { SOCKET_CONNECT, SOCKET_INIT, SOCKET_CLOSE } from '../actions/types';

const initialState = {
  connected: false,
  socket: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SOCKET_CONNECT:
      return Object.assign({}, state, {
        connected: action.connected,
      });
    case SOCKET_INIT:
      return Object.assign({}, state, {
        socket: action.socket,
      });
    case SOCKET_CLOSE:
      return Object.assign({}, state, {
        socket: null,
        connected: false,
      });

    default:
      return state;
  }
}
