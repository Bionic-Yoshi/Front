/* eslint-disable func-names,import/prefer-default-export */
import axios from 'axios';
import { FETCH_ROOM, ROOM_CREATE, ROOM_JOIN } from './types';

import config from '../conf';

const ROOT_URL = config.apiUrl;

export function fetchRoom() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/getrooms`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: FETCH_ROOM,
            payload: response.data,
          });
        } else console.log(response.status);
      })
      .catch(e => {
        console.log(e.message);
      });
  };
}

export function addRoom(title) {
  return function(dispatch) {
    axios
      .post(
        `${ROOT_URL}/addroom`,
        { title },
        {
          headers: { authorization: localStorage.getItem('token') },
        },
      )
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: ROOM_CREATE,
            payload: response.data,
          });
        } else console.log(response.status);
      })
      .catch(e => {
        console.log(e.message);
      });
  };
}

export function joinRoom(slug) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/join/${slug}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: ROOM_JOIN,
            payload: response.data,
          });
        } else console.log(response.status);
      })
      .catch(e => {
        console.log(e.message);
      });
  };
}
