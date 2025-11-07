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
import { TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import useMetrics from '../../../hooks/use-metrics';

const TextWrapper = styled.View<{ contentType: string }>`
  width: 70%;
  height: 40%;
  position: relative;
  justify-content: ${({ contentType }) => contentType};
  align-items: center;
  letter-spacing: 2;
`;

const AcolyteSwampTower = () => {
  const { ms } = useMetrics();
  const { user, setUser } = useContext(UserContext)!;
  const isInTowerEntrance = user!.is_in_tower_entrance;
  const isInsideTower = user!.is_inside_tower;
  const textStyle: TextStyle & ViewStyle = {
    color: 'white',
    fontSize: ms(30, 1),
  };

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
          <TextWrapper contentType="center">
            <Text style={textStyle}>
              To leave this place, you must prove your honor. Present your
              credentials, {user?.nickname}, and the Tower will let you pass
            </Text>
          </TextWrapper>
        </ScreenContainer>
      )}

      {isInTowerEntrance && !isInsideTower && (
        <ScreenContainer
          backgroundImgSrc={ScreenBackgroundImgSrc.ACOLYTE_SWAMP_TOWER_ENTRANCE}
        >
          <GoBackButton onPress={handlePress} />
          <TextWrapper contentType="top">
            <Text style={textStyle}>
              Unveil your credentials, and the gates of the Tower shall
              recognize your worth
            </Text>
          </TextWrapper>
        </ScreenContainer>
      )}
    </>
  );
};

export default AcolyteSwampTower;
