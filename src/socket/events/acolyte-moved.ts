import { Location } from '../../interfaces/geolocalization';
import { socket } from '../socket';
import { SocketClientToServerEvents } from '../../constants';

function emitAcolyteMoved(acolyteId: string, acolyteLocation: Location) {
  socket.emit(
    SocketClientToServerEvents.ACOLYTE_MOVED,
    acolyteId,
    acolyteLocation,
  );
}

export default emitAcolyteMoved;
