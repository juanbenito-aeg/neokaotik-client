import ScreenContainer from './ScreenContainer';
import { ScreenBackgroundImgSrc } from '../constants';
import GoBackButton from './GoBackButton';
import { NestedScreenProps } from '../interfaces/generics';
import Header from './Header';

const HallOfSages = ({ onPressGoBackButton }: NestedScreenProps) => {
  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.HALL_OF_SAGES}>
      <Header>The Hall of Sages</Header>
      <GoBackButton onPress={onPressGoBackButton} />
    </ScreenContainer>
  );
};

export default HallOfSages;
