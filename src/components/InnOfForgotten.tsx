import { useEffect } from 'react';
import {
  ButtonBackgroundImgSrc,
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
import Button from './Button';
import { ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ValleySoresLocation } from '../constants/navigation';
import { emitAngeloSubdued } from '../socket/events/angelo-subdued';

const InnOfForgotten = ({ onPressGoBackButton }: NestedScreenProps) => {
  const user = usePlayerStore(state => state.user);

  const { ms } = useMetrics();

  const setModalData = useModalStore(state => state.setModalData);

  const nonAcolytes = usePlayerStore(state => state.nonAcolytes);

  const angelo = nonAcolytes.find(
    nonAcolyte => nonAcolyte.nickname === 'Angelo di Mortis',
  );

  const canPressAngelo =
    user!.rol === UserRole.ACOLYTE &&
    !user!.isBetrayer &&
    angelo!.location === ValleySoresLocation.INN_FORGOTTEN;

  const buttonFixedSize: number = 110;
  const scaleFactor: number = 1;
  const buttonCustomStyleObj: ViewStyle = {
    width: ms(buttonFixedSize, scaleFactor),
    height: ms(buttonFixedSize, scaleFactor),
  };

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
      backgroundImgSrc={
        angelo?.location !== ValleySoresLocation.INN_FORGOTTEN
          ? ScreenBackgroundImgSrc.INN_FORGOTTEN
          : ScreenBackgroundImgSrc.INN_FORGOTTEN_ANGELO
      }
    >
      <Header>The Inn of the Forgotten</Header>
      <GoBackButton onPress={onPressGoBackButton}></GoBackButton>

      {canPressAngelo && (
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          easing="ease-in-out"
          duration={800}
          style={{
            transform: [{ scale: 1.1 }],
            position: 'absolute',
            top: '30.5%',
            right: '15.5%',
          }}
        >
          <Button
            testID="angelo-pressed"
            customStyleObj={buttonCustomStyleObj}
            onPress={emitAngeloSubdued}
            backgroundImgSrc={ButtonBackgroundImgSrc.INN_FORGOTTEN_ANGELO}
          />
        </Animatable.View>
      )}
    </ScreenContainer>
  );
};

export default InnOfForgotten;
