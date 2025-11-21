import styled from 'styled-components/native';
import Text from './Text';
import { MS } from '../interfaces/Metrics';
import useMetrics from '../hooks/use-metrics';
import { PropsWithChildren } from 'react';

const StyledHeader = styled(Text)<{ $ms: MS }>`
  position: absolute;
  top: ${({ $ms }) => $ms(62.5, 0.9)}px;
  font-size: ${({ $ms }) => $ms(30, 1)}px;
  color: rgb(191 245 205);
`;

const Header = ({ children }: PropsWithChildren) => {
  const { ms } = useMetrics();

  return <StyledHeader $ms={ms}>{children}</StyledHeader>;
};

export default Header;
