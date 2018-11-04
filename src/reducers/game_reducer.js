/* eslint-disable no-unused-vars */
import { GET_ROOM_FROM_SLUG } from '../actions/types';

const initialState = {
  currentRoom: null,
  isLoaded: false,
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROOM_FROM_SLUG:
      return Object.assign({}, state, {
        currentRoom: action.payload,
        isLoaded: true,
      });
    default:
      return state;
  }
}
