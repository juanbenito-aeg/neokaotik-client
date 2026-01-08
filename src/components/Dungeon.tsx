import { ViewStyle } from 'react-native';
import { UserRole } from '../constants/general';
import {
  ButtonBackgroundImgSrc,
  ScreenBackgroundImgSrc,
} from '../constants/image-sources';
import { MapNavigation, OldSchoolLocation, Tab } from '../constants/navigation';
import { NestedScreenProps } from '../interfaces/generics';
import usePlayerStore from '../store/usePlayerStore';
import Button from './Button';
import GoBackButton from './GoBackButton';
import Header from './Header';
import ScreenContainer from './ScreenContainer';
import emitAngeloTrialBegin from '../socket/events/angelo-trial-began';
import { navigate } from '../RootNavigation';

const Dungeon = ({ onPressGoBackButton }: NestedScreenProps) => {
  const nonAcolytes = usePlayerStore(state => state.nonAcolytes)!;

  const acolytes = usePlayerStore(state => state.acolytes)!;

  const user = usePlayerStore(state => state.user)!;

  let allAcolytesInside = true;

  acolytes.forEach(acolyte => {
    if (!acolyte.isBetrayer && !acolyte.is_inside_hs) {
      allAcolytesInside = false;
    }
  });

  let allNonAcolytesInside = true;

  nonAcolytes.forEach(nonAcolyte => {
    const isExcluded =
      nonAcolyte.rol === UserRole.MORTIMER ||
      nonAcolyte.rol === UserRole.ANGELO;

    if (!isExcluded && !nonAcolyte.is_inside_hs) {
      allNonAcolytesInside = false;
    }
  });

  const playersInsideHS = allAcolytesInside && allNonAcolytesInside;

  const angelo = nonAcolytes.find(
    nonAcolyte => nonAcolyte.rol === UserRole.ANGELO,
  )!;

  const buttonCustomStyleObj: ViewStyle = {
    position: 'absolute',
    bottom: '10%',
  };

  return (
    <ScreenContainer
      backgroundImgSrc={
        angelo.location === OldSchoolLocation.DUNGEON &&
        (angelo.isCaptured || angelo.isGuilty)
          ? ScreenBackgroundImgSrc.DUNGEON_ANGELO
          : ScreenBackgroundImgSrc.DUNGEON
      }
    >
      <GoBackButton onPress={onPressGoBackButton} />
      <Header>Dungeon</Header>

      {user.rol === UserRole.MORTIMER &&
        playersInsideHS &&
        angelo.location === OldSchoolLocation.DUNGEON && (
          <Button
            customStyleObj={buttonCustomStyleObj}
            backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
            onPress={() => {
              emitAngeloTrialBegin();
              navigate(Tab.MAP, {
                screenChangingNotificationData: {
                  destination: MapNavigation.OLD_SCHOOL_MAP,
                  specificLocation: OldSchoolLocation.HALL_OF_SAGES,
                },
              });
            }}
            text="Begin Angelo's trial"
          />
        )}
    </ScreenContainer>
  );
};

export default Dungeon;
