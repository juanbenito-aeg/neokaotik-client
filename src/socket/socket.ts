import { io, Socket } from 'socket.io-client';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../interfaces/socket';
import { SocketGeneralEvents } from '../constants';
import { handleConnection } from './handlers/connection';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://10.50.0.50:6000/',
  {
    autoConnect: false,
  },
);

function initSocket(userEmail: string) {
  socket.on(SocketGeneralEvents.CONNECT, () => {
    handleConnection(userEmail);
  });

  socket.connect();
}

function performSocketCleanUp(...eventListenersCleaners) {
  eventListenersCleaners.forEach(eventListenersCleaner => {
    if (eventListenersCleaner) {
      eventListenersCleaner();
    }
  });

  socket.off(SocketGeneralEvents.CONNECT);

  socket.disconnect();
}

export { socket, initSocket, performSocketCleanUp };
