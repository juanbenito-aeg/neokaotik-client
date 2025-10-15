import { SocketServerToClientEvents } from '../../constants';
import { SetGeneralModalMessage } from '../../interfaces/GeneralModal';
import { AcolyteDataAfterAccessExitLab } from '../../interfaces/socket';
import { handleAcolyteInsideOutsideLab } from '../handlers/angelo-lab';
import { socket } from '../socket';

function listenForAcolyteInsideOutsideLab(
  recipientRole: string,
  setGeneralModalMessage?: SetGeneralModalMessage,
  user?: any,
  setUser?: any,
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
