import { io, Socket } from 'socket.io-client';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  AcolyteDataAfterAccessExitLab,
  AcolyteDataToAccessOrExitTower,
  SetIsSocketReconnected,
} from '../interfaces/socket';
import {
  SocketGeneralEvents,
  SocketServerToClientEvents,
} from '../constants/socket';
import { handleConnection } from './handlers/connection';
import KaotikaUser from '../interfaces/KaotikaUser';
import { SetAcolytes, SetNonAcolytes, SetUser } from '../interfaces/player';
import { SetModalData } from '../interfaces/Modal';
import {
  handleAcolyteDisconnected,
  handleAcolyteInsideOutsideLab,
} from './handlers/angelo-lab';
import { Location } from '../interfaces/geolocalization';
import handleAcolytePositionChanged from './handlers/acolyte-position-changed';
import { handleAcolyteTowerAccess } from './handlers/tower-access';
import handlerArtifactPressManaged from './handlers/artifact-press-managed';
import { MS } from '../interfaces/Metrics';
import handleEnteredExitedHS from './handlers/entered-exited-hs';
import { SetArtifacts } from '../interfaces/Artifact';
import handleArtifactsSearchValidationResetManaged from './handlers/artifacts-search-validation-reset-managed';
import handleRequestedToShowArtifacts from './handlers/requested-to-show-artifacts';
import {
  SetAngeloTrialState,
  SetAngeloTrialVotes,
  SetShowAngeloAnimation,
  SetShowArtifactsAnimation,
} from '../interfaces/HallSages';
import { SetIsLoading } from '../interfaces/IsLoading';
import handleAcolyteBecameBetrayer from './handlers/acolyte-became-betrayer';
import handleAngeloSubdued from './handlers/angelo-subdued';
import { handleAcolyteResistanceRestored } from './handlers/acolyte-resistance-restored';
import handleCronTask from './handlers/cron-task-executed';
import handleAcolyteInfected from './handlers/acolyte-infected';
import { handleAcolyteCursed } from './handlers/acolyte-cursed';
import { handleMortimerAidedAcolyte } from './handlers/mortimer-aided-acolyte';
import handleAngeloDelivered from './handlers/angelo-delivered';
import handlePLayerVotedAngeloTrial from './handlers/player-voted-angelo-trial';
import { handleAngeloTrialFinished } from './handlers/angelo-trial-finished';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'https://neokaotik-server.onrender.com/',
  { autoConnect: false },
);

function initSocket(
  ms: MS,
  setModalData: SetModalData,
  user: KaotikaUser,
  setUser: SetUser,
  acolytes: KaotikaUser[],
  setAcolytes: SetAcolytes,
  setNonAcolytes: SetNonAcolytes,
  setArtifacts: SetArtifacts,
  setShowArtifactsAnimation: SetShowArtifactsAnimation,
  setIsLoading: SetIsLoading,
  setShowAngeloAnimation: SetShowAngeloAnimation,
  setAngeloTrialState: SetAngeloTrialState,
  setAngeloTrialVotes: SetAngeloTrialVotes,
  setIsSocketReconnected: SetIsSocketReconnected,
) {
  // Listen for events

  // Related to Angelo's laboratory
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
    SocketServerToClientEvents.ACOLYTE_DISCONNECTED,
    (acolyteEmail: string) => {
      handleAcolyteDisconnected(acolyteEmail, acolytes, setAcolytes);
    },
  );

  // Related to The Swamp Tower
  socket.on(
    SocketServerToClientEvents.ACOLYTE_TOWER_ACCESS,
    (acolyteData: AcolyteDataToAccessOrExitTower) => {
      handleAcolyteTowerAccess(acolyteData, setUser);
    },
  );

  // Related to The Swamp
  socket.on(
    SocketServerToClientEvents.ACOLYTE_POSITION_CHANGED,
    (acolyteId: string, acolyteLocation: Location) => {
      handleAcolytePositionChanged(setAcolytes, acolyteId, acolyteLocation);
    },
  );
  socket.on(
    SocketServerToClientEvents.ARTIFACT_PRESS_MANAGED,
    (isArtifactCollected, acolyteId, artifactId) => {
      handlerArtifactPressManaged(
        ms,
        setModalData,
        setAcolytes,
        acolyteId,
        artifactId,
        setArtifacts,
        user,
        setIsLoading,
        isArtifactCollected,
      );
    },
  );

  // Related to The Hall of Sages
  socket.on(
    SocketServerToClientEvents.ENTERED_EXITED_HS,
    (acolyteOrMortimerId: string, isInsideHS: boolean) => {
      handleEnteredExitedHS(
        acolyteOrMortimerId,
        isInsideHS,
        acolytes,
        setAcolytes,
        setNonAcolytes,
      );
    },
  );
  socket.on(
    SocketServerToClientEvents.ARTIFACTS_SEARCH_VALIDATION_RESET_MANAGED,
    acolytesHaveCompletedArtifactsSearch => {
      handleArtifactsSearchValidationResetManaged(
        acolytesHaveCompletedArtifactsSearch,
        setModalData,
        setAcolytes,
        setArtifacts,
      );
    },
  );
  socket.on(SocketServerToClientEvents.REQUESTED_TO_SHOW_ARTIFACTS, () => {
    handleRequestedToShowArtifacts(
      user!,
      ms,
      setModalData,
      setShowArtifactsAnimation,
    );
  });

  socket.on(
    SocketServerToClientEvents.ACOLYTE_BECAME_BETRAYER,
    (acolyteId, acolyteUpdatedFields) => {
      handleAcolyteBecameBetrayer(
        acolyteId,
        acolyteUpdatedFields,
        user,
        setUser,
        setAcolytes,
        setIsLoading,
      );
    },
  );
  socket.on(SocketServerToClientEvents.ANGELO_SUBDUED, () => {
    handleAngeloSubdued(setNonAcolytes);
  });

  socket.on(
    SocketServerToClientEvents.ACOLYTE_RESISTANCE_RESTORED,
    (acolyteId, acolyteUpdatedAttributes) => {
      handleAcolyteResistanceRestored(
        acolyteId,
        acolyteUpdatedAttributes,
        user,
        setUser,
        setAcolytes,
      );
    },
  );

  socket.on(
    SocketServerToClientEvents.CRON_TASK_EXECUTED,
    (acolyteId, acolyteUpdatedFields) => {
      handleCronTask(
        acolyteId,
        acolyteUpdatedFields,
        user,
        setUser,
        setAcolytes,
      );
    },
  );

  socket.on(
    SocketServerToClientEvents.ACOLYTE_INFECTED,
    (acolyteId, acolyteUpdatedFields) => {
      handleAcolyteInfected(
        acolyteId,
        acolyteUpdatedFields,
        user,
        setUser,
        setAcolytes,
        setIsLoading,
      );
    },
  );

  socket.on(
    SocketServerToClientEvents.ACOLYTE_CURSED,
    (acolyteId, acolyteUpdatedFields) => {
      handleAcolyteCursed(
        acolyteId,
        acolyteUpdatedFields,
        user,
        setUser,
        setAcolytes,
        setIsLoading,
      );
    },
  );

  socket.on(
    SocketServerToClientEvents.MORTIMER_AIDED_ACOLYTE,
    (acolyteId, acolyteUpdatedFields) => {
      handleMortimerAidedAcolyte(
        acolyteId,
        acolyteUpdatedFields,
        user,
        setUser,
        setAcolytes,
        setIsLoading,
      );
    },
  );

  socket.on(
    SocketServerToClientEvents.ANGELO_DELIVERED,
    angeloUpdatedFields => {
      handleAngeloDelivered(
        angeloUpdatedFields,
        setNonAcolytes,
        setIsLoading,
        setShowAngeloAnimation,
      );
    },
  );

  socket.on(
    SocketServerToClientEvents.PLAYER_VOTED_ANGELO_TRIAL,
    (playerId, vote) => {
      handlePLayerVotedAngeloTrial(playerId, vote, setAcolytes, setNonAcolytes);
    },
  );

  socket.on(
    SocketServerToClientEvents.ANGELO_TRIAL_FINISHED,
    (angeloUpdatedFields, angeloTrialVotes) => {
      handleAngeloTrialFinished(
        angeloUpdatedFields,
        setNonAcolytes,
        setAngeloTrialState,
        setAngeloTrialVotes,
        setIsLoading,
        angeloTrialVotes,
      );
    },
  );

  if (socket.disconnected) {
    registerConnectEventAndConnect(user.email, setIsSocketReconnected);
  }

  return performSocketCleanUp;
}

function registerConnectEventAndConnect(
  userEmail: string,
  setIsSocketReconnected: SetIsSocketReconnected,
) {
  socket.on(SocketGeneralEvents.CONNECT, () => {
    handleConnection(userEmail, setIsSocketReconnected);
  });

  socket.disconnect();
  socket.connect();
}

function performSocketCleanUp(userRef: React.RefObject<KaotikaUser | null>) {
  // Remove all listeners for all events
  socket.off();

  // Avoid socket disconnection every time state used in "initSocket" is updated
  setTimeout(() => {
    if (!userRef.current) {
      socket.disconnect();
    }
  }, 0);
}

export { socket, initSocket, registerConnectEventAndConnect };
