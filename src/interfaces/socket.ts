import {
  SocketClientToServerEvents,
  SocketServerToClientEvents,
} from '../constants';
import { Location } from './geolocalization';

// Declaration of the events used when receiving events from the server
interface ServerToClientEvents {
  [SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB]: (
    acolyteData: AcolyteDataAfterAccessExitLab,
  ) => void;
  [SocketServerToClientEvents.ACOLYTE_DISCONNECTED]: (
    acolyteEmail: string,
  ) => void;
  [SocketServerToClientEvents.ACOLYTE_TOWER_ACCESS]: (
    acolyteData: AcolyteDataToAccessOrExitTower,
  ) => void;
  [SocketServerToClientEvents.ACOLYTE_POSITION_CHANGED]: (
    acolyteId: string,
    acolyteLocation: Location,
  ) => void;
  [SocketServerToClientEvents.ARTIFACT_COLLECTED]: (
    acolyteId: string,
    artifactId: string,
  ) => void;
  [SocketServerToClientEvents.ENTERED_EXITED_HS]: (
    acolyteOrMortimerId: string,
    isInsideHS: boolean,
  ) => void;
  [SocketServerToClientEvents.ARTIFACTS_SEARCH_VALIDATION_RESET_MANAGED]: (
    acolytesHaveCompletedArtifactsSearch: boolean,
  ) => void;
  [SocketServerToClientEvents.REQUESTED_TO_SHOW_ARTIFACTS]: () => void;
}

interface AcolyteDataAfterAccessExitLab {
  email: string;
  isInside: boolean;
  nickname: string;
  avatar: string;
}

interface AcolyteDataToAccessOrExitTower {
  is_in_tower_entrance: boolean;
  is_inside_tower: boolean;
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
  [SocketClientToServerEvents.REMOVE_SPELL_PRESS]: () => void;
  [SocketClientToServerEvents.SCROLL_PRESS]: (isPressed: boolean) => void;
  [SocketClientToServerEvents.ENTERED_EXITED_HS]: (
    acolyteOrMortimerId: string,
    isInsideHS: boolean,
    handleEventNotReceivedInServer: (error: any) => void,
  ) => void;
  [SocketClientToServerEvents.ACOLYTE_MOVED]: (
    acolyteId: string,
    acolyteLocation: Location,
  ) => void;
  [SocketClientToServerEvents.ARTIFACT_PRESSED]: (
    acolyteId: string,
    artifactId: string,
  ) => void;
  [SocketClientToServerEvents.REQUESTED_TO_SHOW_ARTIFACTS]: () => void;
}

export type {
  ServerToClientEvents,
  AcolyteDataAfterAccessExitLab,
  AcolyteDataToAccessOrExitTower,
  ClientToServerEvents,
};
