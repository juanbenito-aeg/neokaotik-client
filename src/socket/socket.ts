import { io, Socket } from 'socket.io-client';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  AcolyteDataAfterAccessExitLab,
  AcolyteDataToAccessOrExitTower,
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
import { SetShowArtifactsAnimation } from '../interfaces/HallSages';
import { SetIsLoading } from '../interfaces/IsLoading';
import handleAcolyteBecameBetrayer from './handlers/acolyte-became-betrayer';
import handleAngeloSubdued from './handlers/angelo-subdued';
import { handleAcolyteResistanceRestored } from './handlers/acolyte-resistance-restored';
import handleCronTask from './handlers/cron-task-executed';

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
    (acolyteId, acolyteUpdatedAttributes) => {
      handleCronTask(
        acolyteId,
        acolyteUpdatedAttributes,
        user,
        setUser,
        setAcolytes,
      );
    },
  );

  if (socket.disconnected) {
    socket.on(SocketGeneralEvents.CONNECT, () => {
      handleConnection(user.email);
    });

    socket.connect();
  }

  return performSocketCleanUp;
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

export { socket, initSocket };
