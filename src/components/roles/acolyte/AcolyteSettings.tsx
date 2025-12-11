import ScreenContainer from '../../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../../constants/image-sources';
import Logout from '../../Logout';

const AcolyteSettings = () => {
  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.ACOLYTE_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );
};

export default AcolyteSettings;
