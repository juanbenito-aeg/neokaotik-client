import ScreenContainer from './ScreenContainer';
import { ScreenBackgroundImgSrc } from '../constants';
import GoBackButton from './GoBackButton';
import { NestedScreenProps } from '../interfaces/generics';
import Header from './Header';
import usePlayerStore from '../store/usePlayerStore';
import styled from 'styled-components/native';
import { MS } from '../interfaces/Metrics';
import useMetrics from '../hooks/use-metrics';

const Avatar = styled.Image<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(70, 1)}px;
  height: ${({ $ms }) => $ms(70, 1)}px;
  margin: ${({ $ms }) => $ms(10, 0.5)}px;
  border-radius: 9999px;
  filter: drop-shadow(0 0px 10px rgb(191 245 205));
`;

const HallOfSages = ({ onPressGoBackButton }: NestedScreenProps) => {
  const { ms } = useMetrics();

  const user = usePlayerStore(state => state.user);
  const acolytes = usePlayerStore(state => state.acolytes);
  const nonAcolytes = usePlayerStore(state => state.nonAcolytes);

  const players = [...acolytes, ...nonAcolytes];

  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.HALL_OF_SAGES}>
      <Header>The Hall of Sages</Header>
      <GoBackButton onPress={onPressGoBackButton} />
      {players.map((player, index) => {
        if (user?._id !== player._id && player.is_inside_hs) {
          return (
            <Avatar key={index} source={{ uri: player.avatar }} $ms={ms} />
          );
        }
      })}
    </ScreenContainer>
  );
};

export default HallOfSages;
