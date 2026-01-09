import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function emitAngeloTrialBegin() {
  socket.emit(SocketClientToServerEvents.ANGELO_TRIAL_BEGAN);
}

export default emitAngeloTrialBegin;
