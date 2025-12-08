import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function updateAcolyteTowerEntranceStatus(isInTowerEntrance: boolean) {
  socket.emit(
    SocketClientToServerEvents.INSIDE_OUTSIDE_TOWER_ENTRANCE,
    isInTowerEntrance,
  );
}

export { updateAcolyteTowerEntranceStatus };
