import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function emitAcolyteInfected(acolyteId: string, diseaseId: string) {
  socket.emit(
    SocketClientToServerEvents.ACOLYTE_INFECTED,
    acolyteId,
    diseaseId,
  );
}

export { emitAcolyteInfected };
