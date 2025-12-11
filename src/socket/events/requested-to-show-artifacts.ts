import { socket } from '../socket';
import { SocketClientToServerEvents } from '../../constants/socket';

function emitToRequestedToShowArtifacts() {
  socket.emit(SocketClientToServerEvents.REQUESTED_TO_SHOW_ARTIFACTS);
}

export default emitToRequestedToShowArtifacts;
