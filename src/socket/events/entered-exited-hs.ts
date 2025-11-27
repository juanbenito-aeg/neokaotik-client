import { SocketClientToServerEvents } from '../../constants';
import { socket } from '../socket';

function updateAcolyteOrMortimerEnteredOrExitedHS(isInsideHS: boolean) {
  socket.emit(SocketClientToServerEvents.ENTERED_EXITED_HS, isInsideHS);
}

export { updateAcolyteOrMortimerEnteredOrExitedHS };
