import { socket } from '../socket';
import { SocketClientToServerEvents } from '../../constants/socket';

function emitAngeloTrialValidatedCanceled(isTrialValidated: boolean) {
  socket.emit(
    SocketClientToServerEvents.ANGELO_TRIAL_VALIDATED_CANCELED,
    isTrialValidated,
  );
}

export { emitAngeloTrialValidatedCanceled };
