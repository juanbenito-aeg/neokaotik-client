import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function emitAcolyteAcceptedBetrayal(acolyteId: string) {
  socket.emit(SocketClientToServerEvents.ACOLYTE_ACCEPTED_BETRAYAL, acolyteId);
}

export { emitAcolyteAcceptedBetrayal };
