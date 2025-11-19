import ScreenContainer from './ScreenContainer';
import { ScreenBackgroundImgSrc } from '../constants';
import GoBackButton from './GoBackButton';
import { NestedScreenProps } from '../interfaces/generics';

const HallOfSages = ({ onPressGoBackButton }: NestedScreenProps) => {
  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.HALL_OF_SAGES}>
      <GoBackButton onPress={onPressGoBackButton} />
    </ScreenContainer>
  );
};

export default HallOfSages;
