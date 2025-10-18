import ScreenContainer from '../../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../../constants';
import Logout from '../../Logout';

const VillainSettings = () => {
  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.VILLAIN_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );
};

export default VillainSettings;
