import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function emitNotifyMortimerOrDeliverAngelo(mortimerIsInsideHS: boolean) {
  if (mortimerIsInsideHS) {
    socket.emit(SocketClientToServerEvents.ANGELO_DELIVERED);
  } else {
    socket.emit(
      SocketClientToServerEvents.MORTIMER_NOTIFIED_FOR_ANGELO_DELIVERY,
    );
  }
}

export default emitNotifyMortimerOrDeliverAngelo;
