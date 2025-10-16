import styled from 'styled-components/native';
import Text from '../../Text';
import useMetrics from '../../../hooks/use-metrics';
import type { HS, MS } from '../../../interfaces/Metrics';
import type { AcolyteStatusProps } from '../../../interfaces/AcolyteStatus';

const Container = styled.View<{ $hs: HS; $ms: MS; $isInside: boolean }>`
  width: ${({ $hs }) => $hs(300)}px;
  margin: auto;
  margin-bottom: ${({ $ms }) => $ms(25, 0.5)}px;
  border-radius: 9999px;
  filter: drop-shadow(0 0 5px rgba(191 245 205 / ${({ $isInside }) =>
    $isInside
      ? '0.85)) brightness(1) grayscale(0)'
      : '0.5)) brightness(0.75) grayscale(1)'};
  background-color: rgba(0 0 0 / 0.85);
`;

const Row = styled.View<{ $ms: MS }>`
  width: 100%;
  height: ${({ $ms }) => $ms(60, 0.5)}px;
  flex-direction: row;
`;

const Avatar = styled.Image<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(60, 0.5)}px;
  height: ${({ $ms }) => $ms(60, 0.5)}px;
  border-radius: 9999px;
`;

const Nickname = styled(Text)`
  color: rgb(191 245 205);
  margin: auto;
`;

const AcolyteStatus = ({ avatar, nickname, isInside }: AcolyteStatusProps) => {
  const { hs, ms } = useMetrics();

  return (
    <Container $hs={hs} $ms={ms} $isInside={isInside}>
      <Row $ms={ms}>
        <Avatar source={{ uri: avatar }} $ms={ms} />

        <Nickname>{nickname}</Nickname>
      </Row>
    </Container>
  );
};

export default AcolyteStatus;
