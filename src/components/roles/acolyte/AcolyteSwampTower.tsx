import { useCallback, useContext, useEffect, useState } from 'react';
import {
  ButtonBackgroundImgSrc,
  MapNavigation,
  ScreenBackgroundImgSrc,
} from '../../../constants';
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
import Button from '../../Button';
import * as Animatable from 'react-native-animatable';
import { handleAcolyteScrollAction } from '../../../socket/events/scroll-press';

const TextWrapper = styled.View`
  width: 70%;
  height: 40%;
  position: relative;
  justify-content: top;
  align-items: center;
  letter-spacing: 2;
`;

const AcolyteSwampTower = () => {
  const { ms } = useMetrics();
  const { user, setUser } = useContext(UserContext)!;
  const isInTowerEntrance = user!.is_in_tower_entrance;
  const isInsideTower = user!.is_inside_tower;
  const [hasClickedScroll, setHasClickedScroll] = useState(false);
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

  const buttonFixedSize: number = 350;
  const scaleFactor: number = 1;
  const buttonCustomStyleObj: ViewStyle = {
    width: ms(buttonFixedSize, scaleFactor),
    height: ms(buttonFixedSize, scaleFactor),
    position: 'absolute',
    top: '25%',
    transform: [{ translateY: '-50%' }],
    filter: 'drop-shadow(0 0 30px #ffd736ff)',
  };

  const handleScrollClick = () => {
    handleAcolyteScrollAction(true);
    setHasClickedScroll(true);
  };

  return (
    <>
      {isInsideTower && !isInTowerEntrance && (
        <ScreenContainer
          backgroundImgSrc={ScreenBackgroundImgSrc.ACOLYTE_SWAMP_TOWER_INTERIOR}
        >
          {!hasClickedScroll && !user?.has_been_summoned_to_hos && (
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              easing="ease-in-out"
              duration={1000}
              style={{
                transform: [{ scale: 1.1 }],
              }}
            >
              <Button
                customStyleObj={buttonCustomStyleObj}
                onPress={handleScrollClick}
                backgroundImgSrc={ButtonBackgroundImgSrc.SCROLL}
              />
            </Animatable.View>
          )}
        </ScreenContainer>
      )}

      {isInTowerEntrance && !isInsideTower && (
        <ScreenContainer
          backgroundImgSrc={ScreenBackgroundImgSrc.ACOLYTE_SWAMP_TOWER_ENTRANCE}
        >
          <GoBackButton onPress={handlePress} />
          <TextWrapper>
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
