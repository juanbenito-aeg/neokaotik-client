import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function emitAngeloSubdued() {
  socket.emit(SocketClientToServerEvents.ANGELO_SUBDUED);
}

export { emitAngeloSubdued };
