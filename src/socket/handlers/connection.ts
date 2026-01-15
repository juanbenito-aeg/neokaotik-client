import { socket } from '../socket';
import {
  SocketGeneralEvents,
  SocketClientToServerEvents,
} from '../../constants/socket';

function handleConnection(userEmail: string) {
  socket.off(SocketGeneralEvents.CONNECT);
  socket.emit(SocketClientToServerEvents.CONNECTION_OPEN, userEmail);
}

export { handleConnection };
