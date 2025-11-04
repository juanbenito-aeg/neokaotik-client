import { ScreenBackgroundImgSrc } from '../../../constants';
import ScreenContainer from '../../ScreenContainer';
import GoBackButton from '../../GoBackButton';
import { NestedScreenProps } from '../../../interfaces/generics';
import AcolytesList from './AcolytesList';
import { useContext } from 'react';
import IsLoadingContext from '../../../contexts/IsLoadingContext';
import CircleSpinner from '../../Spinner';

const MortimerSwampTower = ({ onPressGoBackButton }: NestedScreenProps) => {
  const { isLoading } = useContext(IsLoadingContext)!;

  return (
    <ScreenContainer
      backgroundImgSrc={ScreenBackgroundImgSrc.MORTIMER_SWAMP_TOWER}
    >
      {isLoading ? (
        <CircleSpinner />
      ) : (
        <>
          <AcolytesList
            headerText="Swamp Tower Access Log"
            fieldToFilterAcolytesBy="is_inside_tower"
          />
          <GoBackButton onPress={onPressGoBackButton} />
        </>
      )}
    </ScreenContainer>
  );
};

export default MortimerSwampTower;
