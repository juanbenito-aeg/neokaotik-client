import { UserRole } from '../../constants/general';
import { ModalImgSrc } from '../../constants/image-sources';
import { SetShowArtifactsAnimation } from '../../interfaces/HallSages';
import KaotikaUser from '../../interfaces/KaotikaUser';
import { MS } from '../../interfaces/Metrics';
import { SetModalData, ModalData } from '../../interfaces/Modal';

function handleRequestedToShowArtifacts(
  user: KaotikaUser,
  ms: MS,
  setModalData: SetModalData,
  setShowArtifactsAnimation: SetShowArtifactsAnimation,
) {
  if (user.rol === UserRole.ACOLYTE) {
    setWaitingForValidationModal(ms, setModalData);
    return;
  } else if (user.rol === UserRole.MORTIMER) {
    setShowArtifactsAnimation(true);
  }
}

function setWaitingForValidationModal(ms: MS, setModalData: SetModalData) {
  const modalData: ModalData = {
    fullScreen: true,
    content: {
      message: 'Waiting for validation...',
      image: {
        source: ModalImgSrc.WAITING_HS,
        width: ms(350, 1),
        height: ms(350, 1),
      },
    },
  };

  setModalData(modalData);
}

export default handleRequestedToShowArtifacts;
