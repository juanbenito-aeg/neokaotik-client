import { socket } from '../socket';
import {
  SocketGeneralEvents,
  SocketClientToServerEvents,
} from '../../constants/socket';
import { SetIsSocketReconnected } from '../../interfaces/socket';

function handleConnection(
  userEmail: string,
  setIsSocketReconnected: SetIsSocketReconnected,
) {
  socket.off(SocketGeneralEvents.CONNECT);
  socket.emit(SocketClientToServerEvents.CONNECTION_OPEN, userEmail);
  setIsSocketReconnected(true);
}

export { handleConnection };
