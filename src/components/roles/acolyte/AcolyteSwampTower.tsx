import { useCallback, useEffect, useState } from 'react';
import { MapNavigation } from '../../../constants/navigation';
import {
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
} from '../../../constants/image-sources';
import ScreenContainer from '../../ScreenContainer';
import Text from '../../Text';
import GoBackButton from '../../GoBackButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { updateAcolyteTowerEntranceStatus } from '../../../socket/events/tower-entrance';
import { TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import useMetrics from '../../../hooks/use-metrics';
import Button from '../../Button';
import * as Animatable from 'react-native-animatable';
import { handleAcolyteScrollAction } from '../../../socket/events/scroll-press';
import Header from '../../Header';
import { MS } from '../../../interfaces/Metrics';
import useMapStore from '../../../store/useMapStore';
import usePlayerStore from '../../../store/usePlayerStore';

const TextWrapper = styled.View<{ $ms: MS }>`
  width: 70%;
  height: 40%;
  position: absolute;
  top: ${({ $ms }) => $ms(187.5, 0.9)}px;
`;

const AcolyteSwampTower = () => {
  const [hasClickedScroll, setHasClickedScroll] = useState(false);

  const user = usePlayerStore(state => state.user);
  const setUser = usePlayerStore(state => state.setUser);

  const isInTowerEntrance = user!.is_in_tower_entrance;
  const isInsideTower = user!.is_inside_tower;

  const { ms } = useMetrics();

  const textStyle: TextStyle & ViewStyle = {
    color: 'white',
    fontSize: ms(30, 1),
  };

  const screenData = {
    backgroundImgSrc:
      isInsideTower && !isInTowerEntrance
        ? ScreenBackgroundImgSrc.ACOLYTE_SWAMP_TOWER_INTERIOR
        : ScreenBackgroundImgSrc.ACOLYTE_SWAMP_TOWER_ENTRANCE,
    headerText: `Swamp Tower (${
      isInsideTower && !isInTowerEntrance ? 'Interior' : 'Entrance'
    })`,
  };

  const mapNavigation = useMapStore(state => state.mapNavigation);
  const setMapNavigation = useMapStore(state => state.setMapNavigation);

  useFocusEffect(
    useCallback(() => {
      if (mapNavigation === MapNavigation.SWAMP_TOWER) {
        function updateLocalAndDbUser(updatedIsInTowerEntrance: boolean) {
          setUser(prevUser => ({
            ...prevUser!,
            is_in_tower_entrance: updatedIsInTowerEntrance,
          }));
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
  const tabBarStyle = useMapStore(state => state.tabBarStyle);

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
    filter: 'drop-shadow(0 0 5px rgb(0 0 0))',
  };

  const handleScrollClick = () => {
    handleAcolyteScrollAction(true);
    setHasClickedScroll(true);
  };

  return (
    <ScreenContainer backgroundImgSrc={screenData.backgroundImgSrc}>
      <Header>{screenData.headerText}</Header>

      {isInsideTower &&
        !isInTowerEntrance &&
        !hasClickedScroll &&
        !user?.has_been_summoned_to_hos && (
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

      {isInTowerEntrance && !isInsideTower && (
        <>
          <GoBackButton onPress={handlePress} />
          <TextWrapper $ms={ms}>
            <Text style={textStyle}>
              Unveil your credentials, and the gates of the tower shall
              recognize your worth
            </Text>
          </TextWrapper>
        </>
      )}
    </ScreenContainer>
  );
};

export default AcolyteSwampTower;
