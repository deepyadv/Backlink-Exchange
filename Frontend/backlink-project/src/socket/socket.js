import { io } from 'socket.io-client';

const socket = io("https://linkoback.onrender.com", {
  withCredentials: true,
});

export default socket;
