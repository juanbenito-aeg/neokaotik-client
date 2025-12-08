import { socket } from '../socket';
import { SocketClientToServerEvents } from '../../constants/socket';

function handleConnection(userEmail: string) {
  socket.emit(SocketClientToServerEvents.CONNECTION_OPEN, userEmail);
}

export { handleConnection };
