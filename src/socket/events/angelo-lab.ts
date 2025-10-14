import { SocketServerToClientEvents } from '../../constants';
import { SetAcolytes } from '../../interfaces/Acolytes';
import { SetGeneralModalMessage } from '../../interfaces/GeneralModal';
import KaotikaUser from '../../interfaces/KaotikaUser';
import { AcolyteDataAfterAccessExitLab } from '../../interfaces/socket';
import { handleAcolyteInsideOutsideLab } from '../handlers/angelo-lab';
import { socket } from '../socket';

function listenForAcolyteInsideOutsideLab(
  recipientRole: string,
  setGeneralModalMessage?: SetGeneralModalMessage,
  acolytes?: KaotikaUser[],
  setAcolytes?: SetAcolytes,
) {
  socket.on(
    SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB,
    (acolyteData: AcolyteDataAfterAccessExitLab) => {
      handleAcolyteInsideOutsideLab(
        recipientRole,
        acolyteData,
        setGeneralModalMessage,
        acolytes,
        setAcolytes,
      );
    },
  );

  return () => {
    socket.off(SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB);
  };
}

export { listenForAcolyteInsideOutsideLab };
