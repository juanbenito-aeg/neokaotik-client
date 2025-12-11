import { Location } from '../../interfaces/geolocalization';
import { socket } from '../socket';
import { SocketClientToServerEvents } from '../../constants/socket';

function emitArtifactPressed(
  acolyteId: string,
  acolyteLocation: Location,
  artifactId: string,
) {
  function sendArtifactPressed() {
    socket
      .timeout(5000)
      .emit(
        SocketClientToServerEvents.ARTIFACT_PRESSED,
        acolyteId,
        acolyteLocation,
        artifactId,
        error => {
          if (error) {
            sendArtifactPressed();
          }
        },
      );
  }

  sendArtifactPressed();
}

export default emitArtifactPressed;
