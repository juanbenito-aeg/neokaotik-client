import ScreenContainer from './ScreenContainer';
import {
  ButtonBackgroundImgSrc,
  ScreenBackgroundImgSrc,
  UserRole,
} from '../constants';
import GoBackButton from './GoBackButton';
import { NestedScreenProps } from '../interfaces/generics';
import Header from './Header';
import usePlayerStore from '../store/usePlayerStore';
import styled from 'styled-components/native';
import { MS } from '../interfaces/Metrics';
import useMetrics from '../hooks/use-metrics';
import { useCallback, useState } from 'react';
import { updateAcolyteOrMortimerEnteredOrExitedHS } from '../socket/events/entered-exited-hs';
import KaotikaUser from '../interfaces/KaotikaUser';
import { SetAcolytes, SetNonAcolytes, SetUser } from '../interfaces/player';
import { useFocusEffect } from '@react-navigation/native';
import Button from './Button';
import { ViewStyle } from 'react-native';
import emitToRequestedToShowArtifacts from '../socket/events/requested-to-show-artifacts';
import ArtifactsPanel from './ArtifactsPanel';
import { useHallOfSageStore } from '../store/useHallOfSageStore';

const Avatar = styled.Image<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(70, 1)}px;
  height: ${({ $ms }) => $ms(70, 1)}px;
  margin: ${({ $ms }) => $ms(10, 0.5)}px;
  border-radius: 9999px;
  filter: drop-shadow(0 0px 10px rgb(191 245 205));
`;

const AvatarsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HallOfSages = ({ onPressGoBackButton }: NestedScreenProps) => {
  const { ms } = useMetrics();

  const user = usePlayerStore(state => state.user);
  const setUser = usePlayerStore(state => state.setUser);

  const acolytes = usePlayerStore(state => state.acolytes);
  const setAcolytes = usePlayerStore(state => state.setAcolytes);

  const nonAcolytes = usePlayerStore(state => state.nonAcolytes);
  const setNonAcolytes = usePlayerStore(state => state.setNonAcolytes);

  const players = [...acolytes, ...nonAcolytes];

  const [allArtifactsCollected, setAllArtifactsCollected] =
    useState<boolean>(false);

  const checkAllArtifactsCollected = (acolytes: KaotikaUser[]) => {
    const allFoundArtifacts = acolytes.reduce((acc, acolyte) => {
      if (acolyte.found_artifacts) {
        acc.push(...acolyte.found_artifacts);
      }
      return acc;
    }, [] as string[]);

    return allFoundArtifacts.length === 4;
  };

  const buttonCustomStyleObj: ViewStyle = {
    position: 'absolute',
    top: '60%',
  };

  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const showArtifactsAnimation = useHallOfSageStore(
    state => state.showArtifactsAnimation,
  );

  const handleShowArtifactsClick = () => {
    setButtonClicked(true);
    emitToRequestedToShowArtifacts();
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.rol === UserRole.ACOLYTE || user?.rol === UserRole.MORTIMER) {
        function updateAcolyteOrMortimerIsInsideHS(
          isInsideHS: boolean,
          user: KaotikaUser,
          setUser: SetUser,
          setAcolytes: SetAcolytes,
          setNonAcolytes: SetNonAcolytes,
        ) {
          setUser(prevUser => ({ ...prevUser, is_inside_hs: isInsideHS }));

          if (user.rol === UserRole.ACOLYTE) {
            setAcolytes(prevAcolytes => {
              return prevAcolytes.map(acolyte => {
                if (acolyte._id === user._id) {
                  return { ...acolyte, is_inside_hs: isInsideHS };
                }
                return acolyte;
              });
            });
          } else {
            setNonAcolytes(prevNonAcolytes => {
              return prevNonAcolytes.map(nonAcolyte => {
                if (nonAcolyte._id === user._id) {
                  return { ...nonAcolyte, is_inside_hs: isInsideHS };
                }
                return nonAcolyte;
              });
            });
          }

          updateAcolyteOrMortimerEnteredOrExitedHS(user._id, isInsideHS);
        }

        updateAcolyteOrMortimerIsInsideHS(
          true,
          user,
          setUser,
          setAcolytes,
          setNonAcolytes,
        );

        if (user.rol === UserRole.ACOLYTE) {
          const artifactsCollected = checkAllArtifactsCollected(acolytes);
          setAllArtifactsCollected(artifactsCollected);
        }

        return () => {
          updateAcolyteOrMortimerIsInsideHS(
            false,
            user,
            setUser,
            setAcolytes,
            setNonAcolytes,
          );
        };
      }
    }, []),
  );

  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.HALL_OF_SAGES}>
      <Header>The Hall of Sages</Header>
      <GoBackButton onPress={onPressGoBackButton} />
      {!showArtifactsAnimation && (
        <>
          <AvatarsContainer>
            {players.map((player, index) => {
              if (user?._id !== player._id && player.is_inside_hs) {
                return (
                  <Avatar
                    key={index}
                    source={{ uri: player.avatar }}
                    $ms={ms}
                  />
                );
              }
            })}
          </AvatarsContainer>

          {players.map((player, index) => {
            if (
              player.rol === UserRole.MORTIMER &&
              player.is_inside_hs &&
              !buttonClicked &&
              user!.rol === UserRole.ACOLYTE &&
              user?.is_inside_hs &&
              allArtifactsCollected
            ) {
              return (
                <Button
                  key={index}
                  customStyleObj={buttonCustomStyleObj}
                  onPress={handleShowArtifactsClick}
                  backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
                  text="Show artifacts"
                />
              );
            }
          })}
        </>
      )}
      {showArtifactsAnimation && <ArtifactsPanel />}
    </ScreenContainer>
  );
};

export default HallOfSages;
