import { socket } from '../socket';
import { SocketClientToServerEvents } from '../../constants';

function emitArtifactPressed(acolyteId: string, artifactId: string) {
  socket.emit(
    SocketClientToServerEvents.ARTIFACT_PRESSED,
    acolyteId,
    artifactId,
  );
}

export default emitArtifactPressed;
