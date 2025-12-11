import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function updateAcolyteOrMortimerEnteredOrExitedHS(
  acolyteOrMortimerId: string,
  isInsideHS: boolean,
) {
  function emitEnteredExitedHS() {
    socket
      .timeout(5000)
      .emit(
        SocketClientToServerEvents.ENTERED_EXITED_HS,
        acolyteOrMortimerId,
        isInsideHS,
        error => {
          if (error) {
            // The server did not acknowledge the event in the given delay, so emit it again
            emitEnteredExitedHS();
          }
        },
      );
  }

  emitEnteredExitedHS();
}

export { updateAcolyteOrMortimerEnteredOrExitedHS };
