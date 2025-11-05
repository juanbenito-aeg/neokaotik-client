import { SocketServerToClientEvents } from '../../constants';
import { AcolyteDataToAccessOrExitTower } from '../../interfaces/socket';
import { socket } from '../socket';
import { SetUser } from '../../interfaces/UserContext';
import KaotikaUser from '../../interfaces/KaotikaUser';
import { SetAcolytes } from '../../interfaces/Acolytes';

function listenForAcolyteAccess(
  user: KaotikaUser | null,
  setUser: SetUser,
  acolytes: KaotikaUser[],
  setAcolytes: SetAcolytes,
) {
  socket.on(
    SocketServerToClientEvents.ACOLYTE_TOWER_ACCESS,
    (acolyteData: AcolyteDataToAccessOrExitTower) => {
      setUser({
        ...user!,
        is_in_tower_entrance: acolyteData.is_in_tower_entrance,
        is_inside_tower: acolyteData.is_inside_tower,
      });

      const updatedAcolytes = acolytes.map(acolyte => {
        if (acolyte.email === user!.email) {
          return { ...acolyte, is_inside_tower: acolyteData.is_inside_tower };
        }
        return acolyte;
      });

      setAcolytes(updatedAcolytes);
    },
  );

  return () => {
    socket.off(SocketServerToClientEvents.ACOLYTE_TOWER_ACCESS);
  };
}

export { listenForAcolyteAccess };
