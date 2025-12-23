import ScreenContainer from '../../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../../constants/image-sources';
import Logout from '../../Logout';
import usePlayerStore from '../../../store/usePlayerStore';

const AcolyteSettings = () => {
  const user = usePlayerStore(state => state.user)!;

  const screenContainerBackgroundImgSrc = user.isBetrayer
    ? ScreenBackgroundImgSrc.ACOLYTE_HOLLOW_LOST_SETTINGS
    : ScreenBackgroundImgSrc.ACOLYTE_SETTINGS;

  return (
    <ScreenContainer backgroundImgSrc={screenContainerBackgroundImgSrc}>
      <Logout />
    </ScreenContainer>
  );
};

export default AcolyteSettings;
