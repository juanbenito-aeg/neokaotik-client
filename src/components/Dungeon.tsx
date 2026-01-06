import { UserRole } from '../constants/general';
import { ScreenBackgroundImgSrc } from '../constants/image-sources';
import { NestedScreenProps } from '../interfaces/generics';
import usePlayerStore from '../store/usePlayerStore';
import GoBackButton from './GoBackButton';
import Header from './Header';
import ScreenContainer from './ScreenContainer';

const Dungeon = ({ onPressGoBackButton }: NestedScreenProps) => {
  const nonAcolytes = usePlayerStore(state => state.nonAcolytes);

  const angelo = nonAcolytes.find(
    nonAcolyte => nonAcolyte.rol === UserRole.ANGELO,
  )!;

  return (
    <ScreenContainer
      backgroundImgSrc={
        angelo.isCaptured || angelo.isGuilty
          ? ScreenBackgroundImgSrc.DUNGEON_ANGELO
          : ScreenBackgroundImgSrc.DUNGEON
      }
    >
      <GoBackButton onPress={onPressGoBackButton} />
      <Header>Dungeon</Header>
    </ScreenContainer>
  );
};

export default Dungeon;
