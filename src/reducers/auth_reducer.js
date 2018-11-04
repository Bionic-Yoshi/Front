import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
} from '../actions/types';

const initialState = {
  authenticated: false,
  error: '',
  message: '',
  token: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return Object.assign({}, state, {
        error: '',
        authenticated: true,
        token: action.token,
      });

    case UNAUTH_USER:
      return Object.assign({}, state, {
        authenticated: false,
        token: null,
      });

    case AUTH_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
      });

    case FETCH_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload,
      });

    default:
      return state;
  }
}
