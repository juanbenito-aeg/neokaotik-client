import { ScreenBackgroundImgSrc } from '../constants/image-sources';
import { NestedScreenProps } from '../interfaces/generics';
import GoBackButton from './GoBackButton';
import Header from './Header';
import ScreenContainer from './ScreenContainer';

const Dungeon = ({ onPressGoBackButton }: NestedScreenProps) => {
  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.DUNGEON}>
      <GoBackButton onPress={onPressGoBackButton} />
      <Header>Dungeon</Header>
    </ScreenContainer>
  );
};

export default Dungeon;
