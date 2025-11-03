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

const AcolyteSwampTower = () => {
  const navigation = useNavigation();
  const tabBarStyle = useContext(TabBarStyleContext);
  const { user } = useContext(UserContext)!;
  const isInsideTower = user!.is_inside_tower;
  const { setMapNavigation } =
    useContext<MapNavigationContextInterface>(MapNavigationContext);

  const handlePress = () => {
    setMapNavigation(MapNavigation.MAP);
  };

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: isInsideTower ? { display: 'none' } : tabBarStyle,
    });
  }, [navigation, isInsideTower]);

  return (
    <>
      {isInsideTower ? (
        <ScreenContainer
          backgroundImgSrc={ScreenBackgroundImgSrc.ACOLYTE_SWAMP_TOWER_INTERIOR}
        >
          <Text style={{ color: 'white' }}>
            To leave this place, you must prove your honor. Present your
            credentials, {user?.nickname}, and the Tower will let you pass
          </Text>
        </ScreenContainer>
      ) : (
        <ScreenContainer
          backgroundImgSrc={ScreenBackgroundImgSrc.ACOLYTE_SWAMP_TOWER_ENTRANCE}
        >
          <GoBackButton onPress={handlePress} />
          <Text style={{ color: 'white', top: '-10%' }}>
            Unveil your credentials, and the gates of the Tower shall recognize
            your worth
          </Text>
          {/* TODO: Fill with the corresponding content */}
        </ScreenContainer>
      )}
    </>
  );
};

export default AcolyteSwampTower;
