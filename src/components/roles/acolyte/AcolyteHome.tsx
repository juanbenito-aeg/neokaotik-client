import ScreenContainer from '../../ScreenContainer';
import { ScreenBackgroundImgSrc } from '../../../constants/image-sources';
import usePlayerStore from '../../../store/usePlayerStore';

const AcolyteHome = () => {
  const user = usePlayerStore(state => state.user)!;

  const screenContainerBackgroundImgSrc = user.isBetrayer
    ? ScreenBackgroundImgSrc.HOLLOW_LOST
    : ScreenBackgroundImgSrc.ACOLYTE_HOME;

  return (
    <ScreenContainer
      backgroundImgSrc={screenContainerBackgroundImgSrc}
    ></ScreenContainer>
  );
};

export default AcolyteHome;
