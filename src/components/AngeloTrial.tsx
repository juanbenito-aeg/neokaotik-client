import styled from 'styled-components/native';
import useMetrics from '../hooks/use-metrics';
import usePlayerStore from '../store/usePlayerStore';
import {
  AngeloTrialState,
  UserRole,
  VoteAngeloTrialType,
} from '../constants/general';
import { MS } from '../interfaces/Metrics';
import { useEffect, useState } from 'react';
import Button from './Button';
import {
  ButtonBackgroundImgSrc,
  ModalImgSrc,
  ScreenBackgroundImgSrc,
  VoteIndicatorImgSrc,
} from '../constants/image-sources';
import * as Animatable from 'react-native-animatable';
import emitPlayerVoteInAngeloTrial from '../socket/events/player-voted-in-angelo-trial';
import Text from './Text';
import { useHallOfSageStore } from '../store/useHallOfSageStore';
import { ModalData } from '../interfaces/Modal';
import { useModalStore } from '../store/useModalStore';

const Wrapper = styled.View<{ position: number }>`
  position: absolute;
  top: ${({ position }) => position}%;
`;

const JuryContainer = styled.View`
  position: absolute;
  top: 55%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AvatarContainer = styled.View`
  position: relative;
`;

const Avatar = styled.Image<{ $ms: MS; $big?: boolean }>`
  width: ${({ $ms, $big }) => ($big ? $ms(75, 1) : $ms(55, 1))}px;
  height: ${({ $ms, $big }) => ($big ? $ms(75, 1) : $ms(55, 1))}px;
  margin-right: ${({ $ms }) => $ms(12, 0.5)}px;
  border-radius: 9999px;
  filter: drop-shadow(0 0px 10px rgb(191 245 205));
`;

const VoteIndicator = styled(Avatar)`
  position: absolute;
  border-radius: 0;
  filter: none;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 5%;
  width: 100%;
  align-items: center;
  gap: 20px;
`;

const TextPanel = styled.Image<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(350, 1)}px;
  height: ${({ $ms }) => $ms(180, 1)}px;
  position: absolute;
  top: 66%;
`;

const TextContainer = styled(Text)<{ $ms: MS }>`
  font-size: ${({ $ms }) => $ms(25, 1)}px;
  color: white;
  position: absolute;
  top: ${({ $ms }) => $ms(625, 0.4)}px;
  text-align: center;
  width: 70%;
`;

const AngeloTrial = () => {
  const [vote, setVote] = useState<VoteAngeloTrialType | null>(null);

  const acolytes = usePlayerStore(state => state.acolytes);

  const nonAcolytes = usePlayerStore(state => state.nonAcolytes);

  const players = [...acolytes, ...nonAcolytes];

  const user = usePlayerStore(state => state.user)!;

  const angeloTrialState = useHallOfSageStore(state => state.angeloTrialState);

  const setModalData = useModalStore(state => state.setModalData);

  const { ms } = useMetrics();

  useEffect(() => {
    if (user.rol === UserRole.MORTIMER) {
      const modalData: ModalData = {
        fullScreen: true,
        content: {
          message: 'Take a look at what vote each indicator corresponds to:',
          image: {
            source: ModalImgSrc.VOTE_INDICATORS_LEGEND,
            width: ms(250),
            height: ms(350),
          },
        },
        actionButtonTextOne: 'Dismiss',
        onPressActionButtonOne: () => {
          setModalData(null);
        },
      };

      setModalData(modalData);
    }
  }, []);

  useEffect(() => {
    if (
      angeloTrialState === AngeloTrialState.ACTIVE &&
      !vote &&
      user.rol === UserRole.ACOLYTE &&
      (user.attributes.resistance! <= 30 ||
        user.diseases!.length > 0 ||
        user.isCursed)
    ) {
      // If full-screen modal has been activated due to tiredness, new disease(s) and/or curse, emit a "scratch" vote
      emitPlayerVoteInAngeloTrial(user._id, VoteAngeloTrialType.NONE);
      setVote(VoteAngeloTrialType.NONE);
    }
  }, [user]);

  return (
    <>
      {players.map(player => {
        const avatarUri = player._id === user._id ? user.avatar : player.avatar;

        if (player.rol === UserRole.MORTIMER) {
          return (
            <Wrapper position={20}>
              <Avatar source={{ uri: avatarUri }} $ms={ms} $big />
            </Wrapper>
          );
        } else if (player.rol === UserRole.ANGELO) {
          return (
            <Wrapper position={40}>
              <Avatar source={{ uri: avatarUri }} $ms={ms} $big />
            </Wrapper>
          );
        }

        return null;
      })}

      <JuryContainer>
        {players.map(player => {
          if (
            player.rol !== UserRole.MORTIMER &&
            player.rol !== UserRole.ANGELO &&
            !player.isBetrayer
          ) {
            const avatarUri =
              player._id === user._id ? user.avatar : player.avatar;

            return (
              <AvatarContainer key={player._id}>
                <Avatar source={{ uri: avatarUri }} $ms={ms} />

                {player.voteAngeloTrial && (
                  <VoteIndicator
                    source={VoteIndicatorImgSrc[player.voteAngeloTrial]}
                    resizeMode="stretch"
                    $ms={ms}
                  />
                )}
              </AvatarContainer>
            );
          }

          return null;
        })}
      </JuryContainer>

      {!vote && user.rol !== UserRole.MORTIMER && !user.isBetrayer && (
        <ButtonContainer>
          <Animatable.View animation="fadeInUp" duration={900}>
            <Button
              backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
              onPress={() => {
                emitPlayerVoteInAngeloTrial(
                  user._id,
                  VoteAngeloTrialType.INNOCENT,
                );
                setVote(VoteAngeloTrialType.INNOCENT);
              }}
              text={VoteAngeloTrialType.INNOCENT}
            />

            <Button
              backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
              onPress={() => {
                emitPlayerVoteInAngeloTrial(
                  user._id,
                  VoteAngeloTrialType.GUILTY,
                );
                setVote(VoteAngeloTrialType.GUILTY);
              }}
              text={VoteAngeloTrialType.GUILTY}
            />
          </Animatable.View>
        </ButtonContainer>
      )}

      {vote && (
        <>
          <TextPanel $ms={ms} source={ScreenBackgroundImgSrc.TEXT_PANEL} />

          <TextContainer $ms={ms}>
            {user.nickname} has voted that Angelo is {vote}
          </TextContainer>
        </>
      )}
    </>
  );
};

export default AngeloTrial;
