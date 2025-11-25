import { io, Socket } from 'socket.io-client';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  AcolyteDataAfterAccessExitLab,
} from '../interfaces/socket';
import { SocketGeneralEvents, SocketServerToClientEvents } from '../constants';
import { handleConnection } from './handlers/connection';
import KaotikaUser from '../interfaces/KaotikaUser';
import { SetAcolytes, SetUser } from '../interfaces/player';
import { SetModalData } from '../interfaces/Modal';
import {
  handleAcolyteDisconnected,
  handleAcolyteInsideOutsideLab,
} from './handlers/angelo-lab';
import { Location } from '../interfaces/geolocalization';
import handleAcolytePositionChanged from './handlers/acolyte-position-changed';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'https://neokaotik-server.onrender.com/',
  {
    autoConnect: false,
  },
);

function initSocket(
  setModalData: SetModalData,
  user: KaotikaUser,
  setUser: SetUser,
  acolytes: KaotikaUser[],
  setAcolytes: SetAcolytes,
) {
  socket.on(
    SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB,
    (acolyteData: AcolyteDataAfterAccessExitLab) => {
      handleAcolyteInsideOutsideLab(
        user.rol,
        acolyteData,
        setModalData,
        acolytes,
        setAcolytes,
        setUser,
      );
    },
  );

  socket.on(
    SocketServerToClientEvents.ACOLYTE_POSITION_CHANGED,
    (acolyteId: string, acolyteLocation: Location) => {
      handleAcolytePositionChanged(setAcolytes, acolyteId, acolyteLocation);
    },
  );

  socket.on(
    SocketServerToClientEvents.ACOLYTE_DISCONNECTED,
    (acolyteEmail: string) => {
      handleAcolyteDisconnected(acolyteEmail, acolytes, setAcolytes);
    },
  );

  socket.on(SocketGeneralEvents.CONNECT, () => {
    handleConnection(user.email);
  });

  socket.connect();

  return performSocketCleanUp;
}

function performSocketCleanUp() {
  // Call socket event listener cleaners
  socket.off(SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB);
  socket.off(SocketServerToClientEvents.ACOLYTE_DISCONNECTED);
  socket.off(SocketServerToClientEvents.ACOLYTE_POSITION_CHANGED);
  socket.off(SocketGeneralEvents.CONNECT);

  socket.disconnect();
}

export { socket, initSocket };
