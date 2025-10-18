import ScreenContainer from '../../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../../constants';
import Logout from '../../Logout';

const MortimerSettings = () => {
  return (
    <ScreenContainer
      backgroundImgSrc={ScreenBackgroundImgSrc.MORTIMER_SETTINGS}
    >
      <Logout />
    </ScreenContainer>
  );
};

export default MortimerSettings;
