import ScreenContainer from '../../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../../constants';
import AcolytesStatus from './AcolytesStatus';

const MortimerAngeloLab = () => {
  return (
    <ScreenContainer
      backgroundImgSrc={ScreenBackgroundImgSrc.MORTIMER_ANGELO_LAB}
    >
      <AcolytesStatus />
    </ScreenContainer>
  );
};

export default MortimerAngeloLab;
