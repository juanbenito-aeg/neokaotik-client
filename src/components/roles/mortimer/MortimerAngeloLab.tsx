import { useContext } from 'react';
import IsLoadingContext from '../../../contexts/IsLoadingContext';
import ScreenContainer from '../../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../../constants';
import AcolytesList from './AcolytesList';
import CircleSpinner from '../../Spinner';
import GoBackButton from '../../GoBackButton';
import { NestedScreenProps } from '../../../interfaces/generics';

const MortimerAngeloLab = ({ onPressGoBackButton }: NestedScreenProps) => {
  const { isLoading } = useContext(IsLoadingContext)!;

  return (
    <ScreenContainer
      backgroundImgSrc={ScreenBackgroundImgSrc.MORTIMER_ANGELO_LAB}
    >
      {isLoading ? (
        <CircleSpinner />
      ) : (
        <>
          <AcolytesList
            headerText="Angelo's Laboratory Access Log"
            fieldToFilterAcolytesBy="isInside"
          />
          <GoBackButton onPress={onPressGoBackButton} />
        </>
      )}
    </ScreenContainer>
  );
};

export default MortimerAngeloLab;
