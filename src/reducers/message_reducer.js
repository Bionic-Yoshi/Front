/* eslint-disable no-unused-vars */
import {
  RECEIVE_LOBBY_MESSAGE,
  RECEIVE_GAME_MESSAGE,
  RESET_GAME_MESSAGE,
  RESET_LOBBY_MESSAGE,
} from '../actions/types';

const initialState = {
  lobbyMessageList: [],
  gameMessageList: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_LOBBY_MESSAGE:
      return {
        ...state,
        lobbyMessageList: state.lobbyMessageList.concat(action.payload),
      };

    case RECEIVE_GAME_MESSAGE:
      return {
        ...state,
        gameMessageList: state.gameMessageList.concat(action.payload),
      };

    case RESET_GAME_MESSAGE:
      return Object.assign({}, state, {
        gameMessageList: [],
      });

    case RESET_LOBBY_MESSAGE:
      return Object.assign({}, state, {
        lobbyMessageList: [],
      });

    default:
      return state;
  }
}
