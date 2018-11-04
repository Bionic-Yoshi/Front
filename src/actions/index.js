/* eslint-disable func-names */
import axios from 'axios';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

import config from '../conf';

const ROOT_URL = config.apiUrl;

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to server
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER, token: response.data.token });
      })
      .catch(() => {
        dispatch(authError('Incorrect username or password'));
      });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER, token: response.data.token });
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get(ROOT_URL, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message,
        });
      });
  };
}
