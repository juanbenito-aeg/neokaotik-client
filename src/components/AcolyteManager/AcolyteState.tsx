import { UserRole } from '../../constants/general';
import { useDiseaseStore } from '../../store/useDiseaseStore';
import usePlayerStore from '../../store/usePlayerStore';
import Text from '../Text';
import styled from 'styled-components/native';
import { DiseaseImgSrc } from '../../constants/image-sources';
import { MS } from '../../interfaces/Metrics';
import useMetrics from '../../hooks/use-metrics';
import { AcolyteStateProps } from '../../interfaces/AcolyteManager';

const Container = styled.View`
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const PieceContainer = styled.View<{ $isApplicable: boolean }>`
  align-items: center;
  opacity: ${({ $isApplicable }) => ($isApplicable ? 1 : 0.65)};
`;

const Icon = styled.Image<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(80, 0.4)}px;
  height: ${({ $ms }) => $ms(80, 0.4)}px;
`;

const StyledText = styled(Text)<{ $ms: MS }>`
  font-size: ${({ $ms }) => $ms(18, 0.75)}px;
  color: rgb(191 245 205);
`;

const AcolyteState = ({ acolyte }: AcolyteStateProps) => {
  const user = usePlayerStore(state => state.user)!;

  const diseases = useDiseaseStore(state => state.diseases);

  const { ms } = useMetrics();

  let content;

  switch (user.rol) {
    case UserRole.VILLAIN: {
      content = (
        <>
          {diseases.map(disease => {
            const diseaseNameChunks = disease.name.split(' ');

            const diseaseName =
              diseaseNameChunks[0] + '\n' + diseaseNameChunks[1];

            return (
              <PieceContainer
                key={disease._id}
                $isApplicable={!acolyte.diseases!.includes(disease._id)}
              >
                <Icon
                  source={
                    DiseaseImgSrc[disease.name as keyof typeof DiseaseImgSrc]
                  }
                  resizeMode="contain"
                  $ms={ms}
                />

                <StyledText $ms={ms}>{diseaseName}</StyledText>
              </PieceContainer>
            );
          })}
        </>
      );

      break;
    }
  }

  return <Container>{content}</Container>;
};

export { AcolyteState };
