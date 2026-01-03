import {
  SocketServerToClientEvents,
  SocketClientToServerEvents,
} from '../constants/socket';
import { Fields, VoidFunction } from './generics';
import { Location } from './geolocalization';
import { KaotikaUserAttributes } from './KaotikaUser';

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
  [SocketServerToClientEvents.ARTIFACT_PRESS_MANAGED]: (
    isArtifactCollected: boolean,
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
  [SocketServerToClientEvents.REQUESTED_TO_SHOW_ARTIFACTS]: VoidFunction;
  [SocketServerToClientEvents.ACOLYTE_BECAME_BETRAYER]: (
    acolyteId: string,
    acolyteUpdatedFields: Fields,
  ) => void;
  [SocketServerToClientEvents.ANGELO_SUBDUED]: VoidFunction;
  [SocketServerToClientEvents.ACOLYTE_RESISTANCE_RESTORED]: (
    acolyteId: string,
    acolyteUpdatedAttributes: KaotikaUserAttributes,
  ) => void;
  [SocketServerToClientEvents.CRON_TASK_EXECUTED]: (
    acolyteId: string,
    acolyteUpdatedFields: Fields,
  ) => void;
  [SocketServerToClientEvents.ACOLYTE_INFECTED]: (
    acolyteId: string,
    acolyteUpdatedFields: Fields,
  ) => void;
  [SocketServerToClientEvents.ACOLYTE_CURSED]: (
    acolyteId: string,
    acolyteUpdatedFields: Fields,
  ) => void;
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
  [SocketClientToServerEvents.REMOVE_SPELL_PRESS]: VoidFunction;
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
    acolyteLocation: Location,
    artifactId: string,
    handleEventNotReceivedInServer: (error: any) => void,
  ) => void;
  [SocketClientToServerEvents.REQUESTED_TO_SHOW_ARTIFACTS]: VoidFunction;
  [SocketClientToServerEvents.ARTIFACTS_SEARCH_VALIDATION_RESET]: (
    isSearchValidated: boolean,
  ) => void;
  [SocketClientToServerEvents.ACOLYTE_ACCEPTED_BETRAYAL]: (
    acolyteId: string,
  ) => void;
  [SocketClientToServerEvents.ANGELO_SUBDUED]: VoidFunction;
  [SocketClientToServerEvents.ACOLYTE_RESTED]: (acolyteId: string) => void;
  [SocketClientToServerEvents.ACOLYTE_INFECTED]: (
    acolyteId: string,
    diseaseId: string,
  ) => void;
  [SocketClientToServerEvents.ACOLYTE_CURSED]: (acolyteId: string) => void;
}

export type {
  ServerToClientEvents,
  AcolyteDataAfterAccessExitLab,
  AcolyteDataToAccessOrExitTower,
  ClientToServerEvents,
};
