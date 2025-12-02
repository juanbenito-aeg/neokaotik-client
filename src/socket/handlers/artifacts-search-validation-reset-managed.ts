import { ArtifactState, UserRole } from '../../constants';
import { SetArtifacts } from '../../interfaces/Artifact';
import KaotikaUser from '../../interfaces/KaotikaUser';
import { SetModalData } from '../../interfaces/Modal';
import { SetAcolytes, SetUser } from '../../interfaces/player';

function handleArtifactsSearchValidationResetManaged(
  acolytesHaveCompletedArtifactsSearch: boolean,
  setModalData: SetModalData,
  user: KaotikaUser,
  setUser: SetUser,
  setAcolytes: SetAcolytes,
  setArtifacts: SetArtifacts,
) {
  // Remove acolyte's "Waiting for validation..." modal
  setModalData(null);

  setAcolytes(prevAcolytes =>
    prevAcolytes.map(prevAcolyte => ({ ...prevAcolyte, found_artifacts: [] })),
  );

  if (acolytesHaveCompletedArtifactsSearch && user.rol === UserRole.ACOLYTE) {
    setUser(prevUser => ({
      ...prevUser,
      has_completed_artifacts_search: true,
    }));
  } else if (!acolytesHaveCompletedArtifactsSearch) {
    setArtifacts(prevArtifacts =>
      prevArtifacts.map(prevArtifact => ({
        ...prevArtifact,
        state: ArtifactState.ACTIVE,
      })),
    );
  }
}

export default handleArtifactsSearchValidationResetManaged;
