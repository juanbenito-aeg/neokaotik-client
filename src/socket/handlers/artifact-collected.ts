import { UserRole, ArtifactState } from '../../constants/general';
import { Tab, MapNavigation } from '../../constants/navigation';
import { ModalImgSrc } from '../../constants/image-sources';
import { Artifact, SetArtifacts } from '../../interfaces/Artifact';
import KaotikaUser from '../../interfaces/KaotikaUser';
import { MS } from '../../interfaces/Metrics';
import { ModalData, SetModalData } from '../../interfaces/Modal';
import { SetAcolytes } from '../../interfaces/player';
import { navigate } from '../../RootNavigation';

function handlerArtifactCollected(
  ms: MS,
  setModalData: SetModalData,
  setAcolytes: SetAcolytes,
  acolyteId: string,
  artifactId: string,
  setArtifacts: SetArtifacts,
  user: KaotikaUser,
) {
  setAcolytes(prevAcolytes =>
    prevAcolytes.map(acolyte => {
      if (acolyte._id === acolyteId) {
        if (!acolyte.found_artifacts?.includes(artifactId)) {
          const updatedFoundArtifacts = [
            ...(acolyte.found_artifacts || []),
            artifactId,
          ];

          return { ...acolyte, found_artifacts: updatedFoundArtifacts };
        }
      }

      return acolyte;
    }),
  );

  const nextArtifacts = setAndGetNextArtifacts(artifactId, setArtifacts);

  if (user.rol === UserRole.ACOLYTE) {
    const firstActiveArtifact = nextArtifacts.find(
      artifact => artifact.state === ArtifactState.ACTIVE,
    );

    if (!firstActiveArtifact) {
      setAllArtifactsGatheredModalData(ms, setModalData);
    }
  }
}

function setAndGetNextArtifacts(
  artifactId: string,
  setArtifacts: SetArtifacts,
) {
  let nextArtifacts: Artifact[] = [];

  setArtifacts(prevArtifacts => {
    nextArtifacts = prevArtifacts.map(prevArtifact => {
      if (prevArtifact._id === artifactId) {
        return { ...prevArtifact, state: ArtifactState.COLLECTED };
      }

      return prevArtifact;
    });

    return nextArtifacts;
  });

  return nextArtifacts;
}

function setAllArtifactsGatheredModalData(ms: MS, setModalData: SetModalData) {
  const modalData: ModalData = {
    fullScreen: true,
    content: {
      message:
        'The time has come, brave soul. All the artifacts have been gathered. Present them to Mortimer, and with it, decide the fate of the ancient world.',
      image: {
        source: ModalImgSrc.BAG_OF_ARTIFACTS,
        width: ms(350, 1),
        height: ms(350, 1),
      },
    },
    actionButtonText: 'Return to The Old School',
    onPressActionButton() {
      navigate(Tab.MAP, {
        screenChangingNotificationData: {
          destination: MapNavigation.OLD_SCHOOL_MAP,
        },
      });

      setModalData(null);
    },
  };

  setModalData(modalData);
}

export default handlerArtifactCollected;
