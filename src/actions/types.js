// Authentication

export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';
export const FETCH_MESSAGE = 'fetch_message';

// Room Management

export const FETCH_ROOM = 'fetch_room';
export const ROOM_CREATE = 'room_create';
export const ROOM_CONNECT = 'room_connect';
export const ROOM_JOIN = 'room_join';
export const ROOM_DELETE = 'room_delete';
export const ROOM_MSG = 'room_msg';
export const GET_ROOM_FROM_SLUG = 'get_room_from_slug';

export const ROOM_SOCKET_UPDATE = 'updateRoom';
export const ROOM_SOCKET_REMOVE = 'deleteRoom';

// Profile Management

export const PROFILE_CHANGE_PASSWORD = 'profile_change_password';
export const PROFILE_GET_STATS = 'profile_get_stats';

// socket

export const SOCKET_CONNECT = 'socket_connected';
export const SOCKET_INIT = 'socket_init';
export const SOCKET_CLOSE = 'socket_close';

// Message Systeme

export const RECEIVE_LOBBY_MESSAGE = 'lobbyMessage';
export const RECEIVE_GAME_MESSAGE = 'gameMessage';
export const RESET_LOBBY_MESSAGE = 'resetLobbyMessage';
export const RESET_GAME_MESSAGE = 'resetGameMessage';
