import { MapNavigation, ModalImgSrc, Tab } from '../../constants';
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
) {
  const modalData: ModalData = {
    fullScreen: true,
    content: {
      message:
        'The time has come, brave soul. All the artifacts have been gathered. Present them to Mortimer, and with it, decide the fate of the ancient world',
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

  setAcolytes(prevAcolytes => {
    const nextAcolytes = prevAcolytes.map(acolyte => {
      if (acolyte._id === acolyteId) {
        if (!acolyte.found_artifacts?.includes(artifactId)) {
          const updatedFoundArtifacts = [
            ...(acolyte.found_artifacts || []),
            artifactId,
          ];

          return {
            ...acolyte,
            found_artifacts: updatedFoundArtifacts,
          };
        }
      }
      return acolyte;
    });

    const allFoundArtifacts = nextAcolytes.reduce((acc, acolyte) => {
      if (acolyte.found_artifacts) {
        acc.push(...acolyte.found_artifacts);
      }
      return acc;
    }, [] as String[]);

    if (allFoundArtifacts.length === 4) {
      setModalData(modalData);
    }

    return nextAcolytes;
  });
}

export default handlerArtifactCollected;
