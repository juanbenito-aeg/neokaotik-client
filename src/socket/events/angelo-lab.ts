import { SocketServerToClientEvents } from '../../constants';
import { SetAcolytes } from '../../interfaces/Acolytes';
import { SetModalData } from '../../interfaces/Modal';
import KaotikaUser from '../../interfaces/KaotikaUser';
import { AcolyteDataAfterAccessExitLab } from '../../interfaces/socket';
import {
  handleAcolyteInsideOutsideLab,
  updateAcolytes,
} from '../handlers/angelo-lab';
import { SetUser } from '../../interfaces/player';
import { socket } from '../socket';

function listenForAcolyteInsideOutsideLab(
  recipientRole: string,
  setModalData?: SetModalData,
  acolytes?: KaotikaUser[],
  setAcolytes?: SetAcolytes,
  setUser?: SetUser,
) {
  socket.on(
    SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB,
    (acolyteData: AcolyteDataAfterAccessExitLab) => {
      handleAcolyteInsideOutsideLab(
        recipientRole,
        acolyteData,
        setModalData,
        acolytes,
        setAcolytes,
        setUser,
      );
    },
  );

  return () => {
    socket.off(SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB);
  };
}

function listenForAcolyteDisconnected(
  acolytes: KaotikaUser[],
  setAcolytes: SetAcolytes,
) {
  const isAcolyteInsideLab: boolean = false;

  socket.on(
    SocketServerToClientEvents.ACOLYTE_DISCONNECTED,
    (acolyteEmail: string) => {
      updateAcolytes(acolyteEmail, isAcolyteInsideLab, acolytes, setAcolytes);
    },
  );

  return () => {
    socket.off(SocketServerToClientEvents.ACOLYTE_DISCONNECTED);
  };
}

export { listenForAcolyteInsideOutsideLab, listenForAcolyteDisconnected };
