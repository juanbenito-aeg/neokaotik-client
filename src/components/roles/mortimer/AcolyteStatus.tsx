import styled from 'styled-components/native';
import Text from '../../Text';
import useMetrics from '../../../hooks/use-metrics';
import type { MS } from '../../../interfaces/Metrics';
import type { AcolyteStatusProps } from '../../../interfaces/AcolyteStatus';

const Container = styled.View<{ $ms: MS; $isInside: boolean }>`
  margin-bottom: ${({ $ms }) => $ms(25, 0.25)}px;
  filter: brightness(${({ $isInside }) => ($isInside ? 100 : 50)}%);
`;

const Row = styled.View<{ $ms: MS }>`
  height: ${({ $ms }) => $ms(50, 0.25)}px;
  flex-direction: row;
  column-gap: ${({ $ms }) => $ms(25, 0.25)}px;
`;

const Avatar = styled.Image<{
  $ms: MS;
}>`
  width: ${({ $ms }) => $ms(50, 0.25)}px;
  height: ${({ $ms }) => $ms(50, 0.25)}px;
  border-radius: ${({ $ms }) => $ms(25, 0.25)}px;
`;

const NicknameContainer = styled.View<{
  $ms: MS;
}>`
  height: 100%;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: ${({ $ms }) => $ms(25, 0.25)}px;
  padding: 0 ${({ $ms }) => $ms(25, 0.25)}px;
`;

const Nickname = styled(Text)`
  color: #fff;
`;

const AcolyteStatus = ({ avatar, nickname, isInside }: AcolyteStatusProps) => {
  const { ms } = useMetrics();

  return (
    <Container $ms={ms} $isInside={isInside}>
      <Row $ms={ms}>
        <Avatar source={{ uri: avatar }} $ms={ms} />

        <NicknameContainer $ms={ms}>
          <Nickname>{nickname}</Nickname>
        </NicknameContainer>
      </Row>
    </Container>
  );
};

export default AcolyteStatus;
