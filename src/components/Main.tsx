import styled from 'styled-components/native';
import useAdaptiveNavigation from '../hooks/use-adaptive-navigation';

const Container = styled.View`
  height: 100%;
`;

const Main = () => {
  const Navigation = useAdaptiveNavigation();

  return (
    <Container>
      <Navigation />
    </Container>
  );
};

export default Main;
