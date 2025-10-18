import ScreenContainer from '../../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../../constants';
import Logout from '../../Logout';

const IstvanSettings = () => {
  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.ISTVAN_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );
};

export default IstvanSettings;
