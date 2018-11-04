/* eslint-disable no-unused-vars */
import {
  FETCH_ROOM,
  ROOM_CREATE,
  ROOM_CONNECT,
  ROOM_JOIN,
  ROOM_SOCKET_UPDATE,
  ROOM_SOCKET_REMOVE,
} from '../actions/types';

const initialState = {
  rooms: [],
  size: 0,
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROOM:
      return Object.assign({}, state, {
        rooms: action.payload,
        size: action.payload.length,
      });
    case ROOM_CREATE:
      return Object.assign({}, state, {});
    case ROOM_CONNECT:
      return Object.assign({}, state, {});
    case ROOM_JOIN:
      return Object.assign({}, state, {});
    case ROOM_SOCKET_REMOVE:
      if (action.payload._id) {
        const roomsTemp = state.rooms.filter(
          el => el._id !== action.payload._id,
        );
        return Object.assign({}, state, {
          rooms: roomsTemp,
          size: roomsTemp.length,
        });
      }
      return Object.assign({}, state, {});
    case ROOM_SOCKET_UPDATE:
      if (action.payload._id) {
        const foundIndex = state.rooms.findIndex(
          x => x._id === action.payload._id,
        );

        if (foundIndex && foundIndex !== -1) {
          return {
            ...state,
            rooms: state.rooms.map(
              room => (room._id === action.payload._id ? action.payload : room),
            ),
            size: state.rooms.length,
          };
        }

        return {
          ...state,
          rooms: state.rooms.concat(action.payload),
        };
      }
      return Object.assign({}, state, {});

    default:
      return state;
  }
}
