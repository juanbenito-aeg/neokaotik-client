import { ArtifactState } from '../../constants';
import { SetArtifacts } from '../../interfaces/Artifact';
import { SetModalData } from '../../interfaces/Modal';
import { SetAcolytes } from '../../interfaces/player';

function handleArtifactsSearchValidationResetManaged(
  acolytesHaveCompletedArtifactsSearch: boolean,
  setModalData: SetModalData,
  setAcolytes: SetAcolytes,
  setArtifacts: SetArtifacts,
) {
  // Remove acolyte's "Waiting for validation..." modal
  setModalData(null);

  const changesToApplyToAcolytes: Record<string, any> = { found_artifacts: [] };

  if (acolytesHaveCompletedArtifactsSearch) {
    changesToApplyToAcolytes.has_completed_artifacts_search = true;
  } else {
    setArtifacts(prevArtifacts =>
      prevArtifacts.map(prevArtifact => ({
        ...prevArtifact,
        state: ArtifactState.ACTIVE,
      })),
    );
  }

  setAcolytes(prevAcolytes =>
    prevAcolytes.map(prevAcolyte => ({
      ...prevAcolyte,
      ...changesToApplyToAcolytes,
    })),
  );
}

export default handleArtifactsSearchValidationResetManaged;
