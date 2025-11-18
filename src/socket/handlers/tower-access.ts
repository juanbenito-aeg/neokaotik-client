import { SocketServerToClientEvents } from '../../constants';
import { AcolyteDataToAccessOrExitTower } from '../../interfaces/socket';
import { socket } from '../socket';
import { SetUser } from '../../interfaces/UserContext';

function listenForAcolyteAccess(setUser: SetUser) {
  socket.on(
    SocketServerToClientEvents.ACOLYTE_TOWER_ACCESS,
    (acolyteData: AcolyteDataToAccessOrExitTower) => {
      setUser(prevUser => ({
        ...prevUser!,
        is_in_tower_entrance: acolyteData.is_in_tower_entrance,
        is_inside_tower: acolyteData.is_inside_tower,
      }));
    },
  );

  return () => {
    socket.off(SocketServerToClientEvents.ACOLYTE_TOWER_ACCESS);
  };
}

export { listenForAcolyteAccess };
