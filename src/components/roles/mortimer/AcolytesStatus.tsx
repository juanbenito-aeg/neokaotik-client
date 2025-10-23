import { useContext } from 'react';
import AcolytesContext from '../../../contexts/AcolytesContext';
import AcolyteStatus from './AcolyteStatus';
import useMetrics from '../../../hooks/use-metrics';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Text from '../../Text';
import { MS } from '../../../interfaces/Metrics';

const Header = styled(Text)<{ $ms: MS }>`
  margin-bottom: ${({ $ms }) => $ms(30, 0.5)}px;
  font-size: ${({ $ms }) => $ms(30, 1)}px;
  color: rgb(191 245 205);
`;

const AcolytesStatus = () => {
  const { acolytes } = useContext(AcolytesContext)!;

  const { ms } = useMetrics();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: ms(30, 0.5),
        paddingBlockStart: ms(62.5, 0.9),
      }}
      showsVerticalScrollIndicator={false}
    >
      <Header $ms={ms}>Angelo's Laboratory Access Log</Header>

      {acolytes.map(acolyte => {
        return (
          <AcolyteStatus
            key={acolyte._id}
            avatar={acolyte.avatar}
            nickname={acolyte.nickname}
            isInside={acolyte.isInside}
          />
        );
      })}
    </ScrollView>
  );
};

export default AcolytesStatus;
