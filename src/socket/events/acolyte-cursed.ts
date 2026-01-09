import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function emitAcolyteCursed(acolyteId: string) {
  socket.emit(SocketClientToServerEvents.ACOLYTE_CURSED, acolyteId);
}

export { emitAcolyteCursed };
