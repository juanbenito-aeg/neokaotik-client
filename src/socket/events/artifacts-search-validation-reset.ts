import { socket } from '../socket';
import { SocketClientToServerEvents } from '../../constants';

function emitArtifactsSearchValidationOrReset(isSearchValidated: boolean) {
  socket.emit(
    SocketClientToServerEvents.ARTIFACTS_SEARCH_VALIDATION_RESET,
    isSearchValidated,
  );
}

export default emitArtifactsSearchValidationOrReset;
