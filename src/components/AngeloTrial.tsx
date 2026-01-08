import styled from 'styled-components/native';
import useMetrics from '../hooks/use-metrics';
import usePlayerStore from '../store/usePlayerStore';
import { UserRole } from '../constants/general';
import { MS } from '../interfaces/Metrics';

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

const AngeloTrial = () => {
  const { ms } = useMetrics();

  const acolytes = usePlayerStore(state => state.acolytes);

  const nonAcolytes = usePlayerStore(state => state.nonAcolytes);

  const players = [...acolytes, ...nonAcolytes];

  return (
    <>
      {players.map(player => {
        if (player.rol === UserRole.MORTIMER) {
          return (
            <Wrapper position={20}>
              <Avatar source={{ uri: player.avatar }} $ms={ms} $big />
            </Wrapper>
          );
        } else if (player.rol === UserRole.ANGELO) {
          return (
            <Wrapper position={40}>
              <Avatar source={{ uri: player.avatar }} $ms={ms} $big />
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
            return <Avatar source={{ uri: player.avatar }} $ms={ms} />;
          }

          return null;
        })}
      </JuryContainer>
    </>
  );
};

export default AngeloTrial;
