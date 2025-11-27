import { SocketClientToServerEvents } from '../../constants';
import { socket } from '../socket';

function updateAcolyteOrMortimerEnteredOrExitedHS(
  acolyteOrMortimerId: string,
  isInsideHS: boolean,
) {
  socket.emit(
    SocketClientToServerEvents.ENTERED_EXITED_HS,
    acolyteOrMortimerId,
    isInsideHS,
  );
}

export { updateAcolyteOrMortimerEnteredOrExitedHS };
