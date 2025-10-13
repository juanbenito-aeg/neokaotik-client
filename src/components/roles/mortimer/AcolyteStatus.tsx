import styled from 'styled-components/native';
import Text from '../../Text';
import useMetrics from '../../../hooks/use-metrics';
import type { ModerateScale } from '../../../interfaces/Metrics';
import type { AcolyteStatusProps } from '../../../interfaces/AcolyteStatus';

const Container = styled.View<{ $moderateScale: ModerateScale }>`
  margin-bottom: ${({ $moderateScale }) => $moderateScale(25, 0.25)}px;
`;

const Row = styled.View<{ $moderateScale: ModerateScale }>`
  height: ${({ $moderateScale }) => $moderateScale(50, 0.25)}px;
  flex-direction: row;
  column-gap: ${({ $moderateScale }) => $moderateScale(25, 0.25)}px;
`;

const Avatar = styled.Image<{
  $moderateScale: ModerateScale;
  $isInside: boolean;
}>`
  width: ${({ $moderateScale }) => $moderateScale(50, 0.25)}px;
  height: ${({ $moderateScale }) => $moderateScale(50, 0.25)}px;
  border-radius: ${({ $moderateScale }) => $moderateScale(25, 0.25)}px;
  filter: brightness(${({ $isInside }) => ($isInside ? 100 : 50)}%);
`;

const NicknameContainer = styled.View<{
  $moderateScale: ModerateScale;
  $isInside: boolean;
}>`
  height: 100%;
  justify-content: center;
  border: 1px solid #fff;
  border-radius: ${({ $moderateScale }) => $moderateScale(25, 0.25)}px;
  padding: 0 ${({ $moderateScale }) => $moderateScale(25, 0.25)}px;
  filter: brightness(${({ $isInside }) => ($isInside ? 100 : 50)}%);
`;

const Nickname = styled(Text)`
  color: #fff;
`;

const AcolyteStatus = ({ avatar, nickname, isInside }: AcolyteStatusProps) => {
  const { moderateScale } = useMetrics();

  return (
    <Container $moderateScale={moderateScale}>
      <Row $moderateScale={moderateScale}>
        <Avatar
          source={{ uri: avatar }}
          $moderateScale={moderateScale}
          $isInside={isInside}
        />

        <NicknameContainer $moderateScale={moderateScale} $isInside={isInside}>
          <Nickname>{nickname}</Nickname>
        </NicknameContainer>
      </Row>
    </Container>
  );
};

export default AcolyteStatus;
