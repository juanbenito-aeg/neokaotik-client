import { useEffect } from 'react';
import {
  ModalImgSrc,
  ScreenBackgroundImgSrc,
} from '../constants/image-sources';
import { NestedScreenProps } from '../interfaces/generics';
import { useModalStore } from '../store/useModalStore';
import usePlayerStore from '../store/usePlayerStore';
import GoBackButton from './GoBackButton';
import Header from './Header';
import ScreenContainer from './ScreenContainer';
import { ModalData } from '../interfaces/Modal';
import useMetrics from '../hooks/use-metrics';
import { UserRole } from '../constants/general';
import { emitAcolyteAcceptedBetrayal } from '../socket/events/acolyte-accepted-betrayal';

const InnOfForgotten = ({ onPressGoBackButton }: NestedScreenProps) => {
  const user = usePlayerStore(state => state.user);

  const { ms } = useMetrics();

  const setModalData = useModalStore(state => state.setModalData);

  const modalData: ModalData = {
    fullScreen: true,
    content: {
      message:
        'To the wanderer who dares to defy their bloodline: Forsake your kin and pledge your loyalty to the Brotherhood of Shadows. In return, claim 50,000 gold coins and the Rotten Set of the Decrepit Betrayer. Your destiny awaits.',
      image: {
        source: ModalImgSrc.BETRAYER_OFFER,
        width: ms(250, 0.5),
        height: ms(350, 0.5),
      },
    },
    actionButtonTextOne: 'Swear loyalty to the Brotherhood',
    onPressActionButtonOne() {
      setModalData(null);
      if (user!.rol === UserRole.ACOLYTE) {
        emitAcolyteAcceptedBetrayal(user!._id);
      }
    },
    actionButtonTextTwo: 'Remain faithful',
    onPressActionButtonTwo() {
      setModalData(null);
    },
  };

  useEffect(() => {
    if (!user!.isBetrayer) {
      setModalData(modalData);
    }
  }, []);

  return (
    <ScreenContainer
      backgroundImgSrc={ScreenBackgroundImgSrc.INN_FORGOTTEN_ANGELO}
    >
      <Header>The Inn of the Forgotten</Header>
      <GoBackButton onPress={onPressGoBackButton}></GoBackButton>
    </ScreenContainer>
  );
};

export default InnOfForgotten;
