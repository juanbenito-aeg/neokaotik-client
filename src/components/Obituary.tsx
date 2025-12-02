import { NestedScreenProps } from '../interfaces/generics';
import ScreenContainer from './ScreenContainer';
import { ScreenBackgroundImgSrc } from '../constants';
import Header from './Header';
import GoBackButton from './GoBackButton';

const Obituary = ({ onPressGoBackButton }: NestedScreenProps) => {
  return (
    <ScreenContainer
      backgroundImgSrc={
        ScreenBackgroundImgSrc.ACOLYTE_HOME /* TODO: Replace with the corresponding background image source */
      }
    >
      <Header>The Obituary</Header>

      <GoBackButton onPress={onPressGoBackButton} />
    </ScreenContainer>
  );
};

export default Obituary;
