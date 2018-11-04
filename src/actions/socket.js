import { SOCKET_CLOSE, SOCKET_CONNECT, SOCKET_INIT } from './types';

export function signinSocket(value) {
  return dispatch => {
    // Submit email/password to server
    dispatch({ type: SOCKET_CONNECT, connected: value });
  };
}

export function socketInit(socket) {
  return dispatch => {
    // Submit email/password to server
    dispatch({ type: SOCKET_INIT, socket });
  };
}

export function socketClose(socket) {
  return dispatch => {
    // Submit email/password to server

    if (socket) socket.close();

    dispatch({ type: SOCKET_CLOSE });
  };
}
