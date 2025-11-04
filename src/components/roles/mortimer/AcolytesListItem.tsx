import styled from 'styled-components/native';
import Text from '../../Text';
import useMetrics from '../../../hooks/use-metrics';
import type { HS, MS } from '../../../interfaces/Metrics';
import type { AcolytesListItemProps } from '../../../interfaces/AcolytesList';

const Container = styled.View<{ $hs: HS; $ms: MS }>`
  width: ${({ $hs }) => $hs(300)}px;
  margin: auto;
  margin-bottom: ${({ $ms }) => $ms(25, 0.5)}px;
  border: 1px solid rgb(191 245 205);
  border-radius: 9999px;
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
  margin: auto;
  color: rgb(191 245 205);
`;

const AcolytesListItem = ({ avatar, nickname }: AcolytesListItemProps) => {
  const { hs, ms } = useMetrics();

  return (
    <Container $hs={hs} $ms={ms}>
      <Row $ms={ms}>
        <Avatar source={{ uri: avatar }} $ms={ms} />
        <Nickname>{nickname}</Nickname>
      </Row>
    </Container>
  );
};

export default AcolytesListItem;
