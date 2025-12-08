import ScreenContainer from '../../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../../constants/image-sources';
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
