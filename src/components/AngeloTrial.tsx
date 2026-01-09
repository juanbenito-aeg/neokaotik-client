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
import { ButtonBackgroundImgSrc } from '../constants/image-sources';
import * as Animatable from 'react-native-animatable';
import emitPlayerVoteInAngeloTrial from '../socket/events/player-voted-in-angelo-trial';
import { useHallOfSageStore } from '../store/useHallOfSageStore';

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

const Avatar = styled.Image<{ $ms: MS; $big?: boolean }>`
  width: ${({ $ms, $big }) => ($big ? $ms(75, 1) : $ms(55, 1))}px;
  height: ${({ $ms, $big }) => ($big ? $ms(75, 1) : $ms(55, 1))}px;
  margin-right: ${({ $ms }) => $ms(12, 0.5)}px;
  border-radius: 9999px;
  filter: drop-shadow(0 0px 10px rgb(191 245 205));
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 5%;
  width: 100%;
  align-items: center;
  gap: 20px;
`;

const AngeloTrial = () => {
  const { ms } = useMetrics();

  const acolytes = usePlayerStore(state => state.acolytes);

  const nonAcolytes = usePlayerStore(state => state.nonAcolytes);

  const players = [...acolytes, ...nonAcolytes];

  const user = usePlayerStore(state => state.user)!;

  const [hasVote, setHasVote] = useState(false);

  const angeloTrialState = useHallOfSageStore(state => state.angeloTrialState);

  useEffect(() => {
    if (
      angeloTrialState === AngeloTrialState.ACTIVE &&
      !hasVote &&
      user.rol === UserRole.ACOLYTE &&
      (user.attributes.resistance! <= 30 ||
        user.diseases!.length > 0 ||
        user.isCursed)
    ) {
      // If full-screen modal has been activated due to tiredness, new disease(s) and/or curse, emit a "scratch" vote
      emitPlayerVoteInAngeloTrial(user._id, VoteAngeloTrialType.NONE);
      setHasVote(true);
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

            return <Avatar source={{ uri: avatarUri }} $ms={ms} />;
          }

          return null;
        })}
      </JuryContainer>

      {!hasVote && user.rol !== UserRole.MORTIMER && !user.isBetrayer && (
        <ButtonContainer>
          <Animatable.View animation="fadeInUp" duration={900}>
            <Button
              backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
              onPress={() => {
                setHasVote(true);
                emitPlayerVoteInAngeloTrial(
                  user._id,
                  VoteAngeloTrialType.INNOCENT,
                );
              }}
              text={VoteAngeloTrialType.INNOCENT}
            />

            <Button
              backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
              onPress={() => {
                setHasVote(true);
                emitPlayerVoteInAngeloTrial(
                  user._id,
                  VoteAngeloTrialType.GUILTY,
                );
              }}
              text={VoteAngeloTrialType.GUILTY}
            />
          </Animatable.View>
        </ButtonContainer>
      )}
    </>
  );
};

export default AngeloTrial;
