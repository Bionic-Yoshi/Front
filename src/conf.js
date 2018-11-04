export default {
  apiUrl:
    process.env.NODE_ENV === 'production'
      ? 'http://35.233.61.218:8090'
      : 'http://localhost:3090',
  webSocketUrl:
    process.env.NODE_ENV === 'production'
      ? 'ws://35.233.61.218:8091'
      : 'ws://localhost:3091',
};
