import styled from 'styled-components/native';
import useMetrics from '../hooks/use-metrics';
import usePlayerStore from '../store/usePlayerStore';
import { UserRole, VoteAngeloTrialType } from '../constants/general';
import { MS } from '../interfaces/Metrics';
import { useState } from 'react';
import Button from './Button';
import {
  ButtonBackgroundImgSrc,
  ScreenBackgroundImgSrc,
} from '../constants/image-sources';
import * as Animatable from 'react-native-animatable';
import emitPlayerVoteInAngeloTrial from '../socket/events/player-voted-in-angelo-trial';
import Text from './Text';

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
  const { ms } = useMetrics();

  const acolytes = usePlayerStore(state => state.acolytes);

  const nonAcolytes = usePlayerStore(state => state.nonAcolytes);

  const players = [...acolytes, ...nonAcolytes];

  const user = usePlayerStore(state => state.user)!;

  const [hasVote, setHasVote] = useState(false);

  const [vote, setVote] = useState('');

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
                setVote(VoteAngeloTrialType.INNOCENT);
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
                setVote(VoteAngeloTrialType.GUILTY);
              }}
              text={VoteAngeloTrialType.GUILTY}
            />
          </Animatable.View>
        </ButtonContainer>
      )}

      {hasVote && (
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
