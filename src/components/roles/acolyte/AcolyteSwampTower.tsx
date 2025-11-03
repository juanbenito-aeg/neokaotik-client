import { useContext, useEffect } from 'react';
import { MapNavigation, ScreenBackgroundImgSrc } from '../../../constants';
import ScreenContainer from '../../ScreenContainer';
import { UserContext } from '../../../contexts/UserContext';
import Text from '../../Text';
import { MapNavigationContextInterface } from '../../../interfaces/Map';
import {
  MapNavigationContext,
  TabBarStyleContext,
} from '../../../contexts/MapContext';
import GoBackButton from '../../GoBackButton';
import { useNavigation } from '@react-navigation/native';
import { updateAcolyteTowerEntranceStatus } from '../../../socket/events/tower-entrance';

const AcolyteSwampTower = () => {
  const { user, setUser } = useContext(UserContext)!;
  const navigation = useNavigation();
  const tabBarStyle = useContext(TabBarStyleContext);
  const isInsideTower = user!.is_inside_tower;
  const isInTowerEntrance = user!.is_in_tower_entrance;
  const { setMapNavigation } =
    useContext<MapNavigationContextInterface>(MapNavigationContext);

  useEffect(() => {
    const updatedUser = { ...user!, is_in_tower_entrance: true };
    setUser(updatedUser);
    updateAcolyteTowerEntranceStatus(!user!.is_in_tower_entrance);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: isInsideTower ? { display: 'none' } : tabBarStyle,
    });
  }, [navigation, isInsideTower]);

  const handlePress = () => {
    const updatedUser = { ...user!, is_in_tower_entrance: false };
    setUser(updatedUser);
    updateAcolyteTowerEntranceStatus(!user!.is_in_tower_entrance);
    setMapNavigation(MapNavigation.MAP);
  };

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
