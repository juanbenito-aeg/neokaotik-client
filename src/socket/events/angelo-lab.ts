import { SocketServerToClientEvents } from '../../constants';
import { SetGeneralModalMessage } from '../../interfaces/GeneralModal';
import KaotikaUser from '../../interfaces/KaotikaUser';
import { AcolyteDataAfterAccessExitLab } from '../../interfaces/socket';
import { SetUser } from '../../interfaces/UserContext';
import { handleAcolyteInsideOutsideLab } from '../handlers/angelo-lab';
import { socket } from '../socket';

function listenForAcolyteInsideOutsideLab(
  recipientRole: string,
  setGeneralModalMessage?: SetGeneralModalMessage,
  user?: KaotikaUser,
  setUser?: SetUser,
) {
  socket.on(
    SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB,
    (acolyteData: AcolyteDataAfterAccessExitLab) => {
      handleAcolyteInsideOutsideLab(
        recipientRole,
        acolyteData,
        setGeneralModalMessage,
        user,
        setUser,
      );
    },
  );

  return () => {
    socket.off(SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB);
  };
}

export { listenForAcolyteInsideOutsideLab };
