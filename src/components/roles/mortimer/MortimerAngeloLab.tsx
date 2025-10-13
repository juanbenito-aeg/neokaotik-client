import { useContext } from 'react';
import IsLoadingContext from '../../../contexts/IsLoadingContext';
import ScreenContainer from '../../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../../constants';
import AcolytesStatus from './AcolytesStatus';
import CircleSpinner from '../../Spinner';

const MortimerAngeloLab = () => {
  const { isLoading } = useContext(IsLoadingContext)!;

  return (
    <ScreenContainer
      backgroundImgSrc={ScreenBackgroundImgSrc.MORTIMER_ANGELO_LAB}
    >
      {isLoading ? <CircleSpinner /> : <AcolytesStatus />}
    </ScreenContainer>
  );
};

export default MortimerAngeloLab;
