import { Location } from '../../interfaces/geolocalization';
import { socket } from '../socket';
import { SocketClientToServerEvents } from '../../constants';

function emitArtifactPressed(
  acolyteId: string,
  acolyteLocation: Location,
  artifactId: string,
) {
  socket.emit(
    SocketClientToServerEvents.ARTIFACT_PRESSED,
    acolyteId,
    acolyteLocation,
    artifactId,
  );
}

export default emitArtifactPressed;
