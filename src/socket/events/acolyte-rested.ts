import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function emitAcolyteRested(acolyteId: string) {
  socket.emit(SocketClientToServerEvents.ACOLYTE_RESTED, acolyteId);
}

export { emitAcolyteRested };
