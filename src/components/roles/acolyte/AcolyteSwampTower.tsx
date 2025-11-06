import { useCallback, useContext, useEffect } from 'react';
import { MapNavigation, ScreenBackgroundImgSrc } from '../../../constants';
import ScreenContainer from '../../ScreenContainer';
import { UserContext } from '../../../contexts/UserContext';
import Text from '../../Text';
import {
  MapNavigationContext,
  TabBarStyleContext,
} from '../../../contexts/MapContext';
import GoBackButton from '../../GoBackButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { updateAcolyteTowerEntranceStatus } from '../../../socket/events/tower-entrance';
import { listenForAcolyteAccess } from '../../../socket/handlers/tower-access';

const AcolyteSwampTower = () => {
  const { user, setUser } = useContext(UserContext)!;
  const isInTowerEntrance = user!.is_in_tower_entrance;
  const isInsideTower = user!.is_inside_tower;

  useEffect(() => {
    const cleanup = listenForAcolyteAccess(user!, setUser);
    return cleanup;
  }, []);

  const { mapNavigation, setMapNavigation } = useContext(MapNavigationContext);

  useFocusEffect(
    useCallback(() => {
      if (mapNavigation === MapNavigation.SWAMP_TOWER) {
        function updateLocalAndDbUser(updatedIsInTowerEntrance: boolean) {
          setUser({ ...user!, is_in_tower_entrance: updatedIsInTowerEntrance });
          updateAcolyteTowerEntranceStatus(updatedIsInTowerEntrance);
        }

        updateLocalAndDbUser(true);

        return () => {
          updateLocalAndDbUser(false);
        };
      }
    }, [mapNavigation]),
  );

  const handlePress = () => {
    setMapNavigation(MapNavigation.MAP);
  };

  const navigation = useNavigation();
  const tabBarStyle = useContext(TabBarStyleContext);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: isInsideTower ? { display: 'none' } : tabBarStyle,
    });
  }, [navigation, isInsideTower]);

  return (
    <>
      {isInsideTower && !isInTowerEntrance && (
        <ScreenContainer
          backgroundImgSrc={ScreenBackgroundImgSrc.ACOLYTE_SWAMP_TOWER_INTERIOR}
        >
          <Text style={{ color: 'white' }}>
            To leave this place, you must prove your honor. Present your
            credentials, {user?.nickname}, and the Tower will let you pass
          </Text>
        </ScreenContainer>
      )}

      {isInTowerEntrance && !isInsideTower && (
        <ScreenContainer
          backgroundImgSrc={ScreenBackgroundImgSrc.ACOLYTE_SWAMP_TOWER_ENTRANCE}
        >
          <GoBackButton onPress={handlePress} />

          <Text style={{ color: 'white', top: '-10%' }}>
            Unveil your credentials, and the gates of the Tower shall recognize
            your worth
          </Text>
        </ScreenContainer>
      )}
    </>
  );
};

export default AcolyteSwampTower;
