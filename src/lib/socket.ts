import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getGameSocket(): Socket {
  if (!socket) {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
    socket = io(`${socketUrl}/game`, {
      autoConnect: false,
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}
