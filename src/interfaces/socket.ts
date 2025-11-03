import {
  SocketClientToServerEvents,
  SocketServerToClientEvents,
} from '../constants';

// Declaration of the events used when receiving events from the server
interface ServerToClientEvents {
  [SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB]: (
    acolyteData: AcolyteDataAfterAccessExitLab,
  ) => void;
  [SocketServerToClientEvents.ACOLYTE_DISCONNECTED]: (
    acolyteEmail: string,
  ) => void;
  [SocketServerToClientEvents.ACOLYTE_TOWER_ACCESS]: (
    acolyteIsInsideTower: boolean,
  ) => void;
}

interface AcolyteDataAfterAccessExitLab {
  email: string;
  isInside: boolean;
  nickname: string;
  avatar: string;
}

// Declaration of the events used when sending events to the server
interface ClientToServerEvents {
  [SocketClientToServerEvents.CONNECTION_OPEN]: (userEmail: string) => void;
  [SocketClientToServerEvents.ACCESS_TO_EXIT_FROM_LAB]: (
    acolyteEmail: string,
    isInside: boolean,
  ) => void;
  [SocketClientToServerEvents.INSIDE_OUTSIDE_TOWER_ENTRANCE]: (
    AcolyteisInTowerEntrance: boolean,
  ) => void;
}

export type {
  ServerToClientEvents,
  AcolyteDataAfterAccessExitLab,
  ClientToServerEvents,
};
