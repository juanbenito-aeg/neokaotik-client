import { ScreenBackgroundImgSrc } from '../../../constants';
import ScreenContainer from '../../ScreenContainer';
import GoBackButton from '../../GoBackButton';
import { NestedScreenProps } from '../../../interfaces/generics';

const MortimerSwampTower = ({ onPressGoBackButton }: NestedScreenProps) => {
  return (
    <ScreenContainer
      backgroundImgSrc={ScreenBackgroundImgSrc.MORTIMER_SWAMP_TOWER}
    >
      <GoBackButton onPress={onPressGoBackButton} />
    </ScreenContainer>
  );
};

export default MortimerSwampTower;
