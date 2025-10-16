import { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import useMetrics from '../hooks/use-metrics';
import { MS } from '../interfaces/Metrics';
import { TextProps } from '../interfaces/Text';

const StyledText = styled.Text<{ $ms: MS }>`
  font-size: ${({ $ms }) => $ms(23, 0.75)}px;
  font-family: KochAltschrift;
  text-align: center;
`;

const Text = ({ style, children }: PropsWithChildren<TextProps>) => {
  const { ms } = useMetrics();

  return (
    <StyledText style={style} $ms={ms}>
      {children}
    </StyledText>
  );
};

export default Text;
