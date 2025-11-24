import { NestedScreenProps } from '../interfaces/generics';
import ScreenContainer from './ScreenContainer';
import { ScreenBackgroundImgSrc } from '../constants';
import Header from './Header';
import GoBackButton from './GoBackButton';

const Swamp = ({ onPressGoBackButton }: NestedScreenProps) => {
  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.SWAMP}>
      <Header>The Swamp</Header>
      <GoBackButton onPress={onPressGoBackButton} />
    </ScreenContainer>
  );
};

export default Swamp;
