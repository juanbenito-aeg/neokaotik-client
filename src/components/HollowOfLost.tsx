import { ScreenBackgroundImgSrc } from '../constants/image-sources';
import { NestedScreenProps } from '../interfaces/generics';
import GoBackButton from './GoBackButton';
import Header from './Header';
import ScreenContainer from './ScreenContainer';

const HollowOfLost = ({ onPressGoBackButton }: NestedScreenProps) => {
  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.HOLLOW_LOST}>
      <Header>The Hollow of the Lost</Header>
      <GoBackButton onPress={onPressGoBackButton}></GoBackButton>
    </ScreenContainer>
  );
};

export default HollowOfLost;
