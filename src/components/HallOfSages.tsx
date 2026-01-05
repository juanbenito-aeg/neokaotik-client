import ScreenContainer from './ScreenContainer';
import { AngeloTrialState, UserRole } from '../constants/general';
import {
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
} from '../constants/image-sources';
import GoBackButton from './GoBackButton';
import { NestedScreenProps } from '../interfaces/generics';
import Header from './Header';
import usePlayerStore from '../store/usePlayerStore';
import styled from 'styled-components/native';
import { MS } from '../interfaces/Metrics';
import useMetrics from '../hooks/use-metrics';
import { useCallback } from 'react';
import { updateAcolyteOrMortimerEnteredOrExitedHS } from '../socket/events/entered-exited-hs';
import { useFocusEffect } from '@react-navigation/native';
import Button from './Button';
import { ViewStyle } from 'react-native';
import emitToRequestedToShowArtifacts from '../socket/events/requested-to-show-artifacts';
import ArtifactsPanel from './ArtifactsPanel';
import { useHallOfSageStore } from '../store/useHallOfSageStore';
import * as Animatable from 'react-native-animatable';
import { OldSchoolLocation } from '../constants/navigation';
import emitNotifyMortimerOrDeliverAngelo from '../socket/events/notify-mortimer-or-deliver-angelo';
import { useIsLoadingStore } from '../store/useIsLoadingStore';

const AvatarsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Avatar = styled.Image<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(70, 1)}px;
  height: ${({ $ms }) => $ms(70, 1)}px;
  margin: ${({ $ms }) => $ms(10, 0.5)}px;
  border-radius: 9999px;
  filter: drop-shadow(0 0px 10px rgb(191 245 205));
`;

const AngeloContainer = styled.View`
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const AngeloAvatarWrapper = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
`;

const HallOfSages = ({ onPressGoBackButton }: NestedScreenProps) => {
  const { ms } = useMetrics();

  const user = usePlayerStore(state => state.user);

  const acolytes = usePlayerStore(state => state.acolytes);

  const nonAcolytes = usePlayerStore(state => state.nonAcolytes);

  const players = [...acolytes, ...nonAcolytes];

  const showArtifactsAnimation = useHallOfSageStore(
    state => state.showArtifactsAnimation,
  );

  const angeloTrialState = useHallOfSageStore(state => state.angeloTrialState);

  const setIsLoading = useIsLoadingStore(state => state.setIsLoading);

  useFocusEffect(
    useCallback(() => {
      updateAcolyteOrMortimerEnteredOrExitedHS(user!._id, true);

      return () => {
        updateAcolyteOrMortimerEnteredOrExitedHS(user!._id, false);
      };
    }, []),
  );

  const areAllArtifactsCollected = checkAllArtifactsAreCollected();

  function checkAllArtifactsAreCollected() {
    const allFoundArtifacts = acolytes.reduce((acc, acolyte) => {
      if (acolyte.found_artifacts) {
        acc.push(...acolyte.found_artifacts);
      }

      return acc;
    }, [] as string[]);

    return allFoundArtifacts.length === 4;
  }

  const areAllAcolytesAndMortimerInsideHS =
    checkAllAcolytesAndMortimerAreInsideHS();

  function checkAllAcolytesAndMortimerAreInsideHS() {
    let areAllAcolytesAndMortimerInsideHS = true;

    for (let i = 0; i < players.length; i++) {
      const player = players[i];

      if (
        (player.rol === UserRole.ACOLYTE || player.rol === UserRole.MORTIMER) &&
        !player.is_inside_hs
      ) {
        areAllAcolytesAndMortimerInsideHS = false;

        break;
      }
    }

    return areAllAcolytesAndMortimerInsideHS;
  }

  const isShowArtifactsButtonVisible =
    user!.rol === UserRole.ACOLYTE &&
    areAllArtifactsCollected &&
    areAllAcolytesAndMortimerInsideHS;

  const buttonCustomStyleObj: ViewStyle = {
    position: 'absolute',
    top: '60%',
  };

  const angelo = players.find(
    player =>
      player.rol === UserRole.ANGELO &&
      player.location === OldSchoolLocation.HALL_OF_SAGES,
  );

  let allAcolytesInside = true;

  acolytes.forEach(acolyte => {
    if (!acolyte.isBetrayer && !acolyte.is_inside_hs) {
      allAcolytesInside = false;
    }
  });

  let mortimerInside = false;

  players.forEach(player => {
    if (player.rol === UserRole.MORTIMER && player.is_inside_hs) {
      mortimerInside = true;
    }
  });

  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.HALL_OF_SAGES}>
      <Header>The Hall of Sages</Header>

      <GoBackButton onPress={onPressGoBackButton} />

      {showArtifactsAnimation ? (
        <ArtifactsPanel />
      ) : (
        <>
          {angelo && (
            <AngeloContainer>
              <Animatable.View
                animation="fadeInDown"
                duration={500}
                easing="ease-out"
              >
                <Animatable.View
                  animation="shake"
                  iterationCount="infinite"
                  duration={4200}
                  easing="ease-in-out"
                >
                  <AngeloAvatarWrapper>
                    <Avatar source={{ uri: angelo.avatar }} $ms={ms} />
                    <Animatable.Image
                      source={ButtonBackgroundImgSrc.CHAINS}
                      animation="pulse"
                      iterationCount="infinite"
                      duration={2200}
                      style={{
                        position: 'absolute',
                        width: ms(67, 1),
                        height: ms(90, 1),
                        opacity: 0.6,
                      }}
                      resizeMode="contain"
                    />
                  </AngeloAvatarWrapper>
                </Animatable.View>
              </Animatable.View>
            </AngeloContainer>
          )}

          <AvatarsContainer>
            {players.map((player, index) => {
              if (user!._id === player._id) return null;

              const isInside = player.is_inside_hs;

              const isSpecialRole =
                player.rol === UserRole.ISTVAN ||
                player.rol === UserRole.VILLAIN;

              const canShowSpecialRole =
                angeloTrialState === AngeloTrialState.ACTIVE ||
                angeloTrialState === AngeloTrialState.FINISHED;

              if (
                isInside &&
                (!isSpecialRole || (isSpecialRole && canShowSpecialRole))
              ) {
                return (
                  <Animatable.View
                    key={index}
                    animation="zoomIn"
                    duration={500}
                  >
                    <Avatar
                      key={index}
                      source={{ uri: player.avatar }}
                      $ms={ms}
                    />
                  </Animatable.View>
                );
              }
            })}
          </AvatarsContainer>

          {allAcolytesInside && angelo && (
            <Button
              customStyleObj={{ marginTop: ms(10) }}
              onPress={() => {
                setIsLoading(true);
                emitNotifyMortimerOrDeliverAngelo(mortimerInside);
              }}
              backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
              text={mortimerInside ? 'Deliver Angelo' : 'Notify Mortimer'}
            />
          )}

          {isShowArtifactsButtonVisible && (
            <Button
              customStyleObj={buttonCustomStyleObj}
              onPress={emitToRequestedToShowArtifacts}
              backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
              text="Show artifacts"
            />
          )}
        </>
      )}
    </ScreenContainer>
  );
};

export default HallOfSages;
