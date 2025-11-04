import { useContext } from 'react';
import AcolytesContext from '../../../contexts/AcolytesContext';
import AcolytesListItem from './AcolytesListItem';
import useMetrics from '../../../hooks/use-metrics';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Text from '../../Text';
import { MS } from '../../../interfaces/Metrics';
import KaotikaUser from '../../../interfaces/KaotikaUser';
import { AcolytesListProps } from '../../../interfaces/AcolytesList';
import IsLoadingContext from '../../../contexts/IsLoadingContext';
import ScreenContainer from '../../ScreenContainer';
import CircleSpinner from '../../Spinner';
import GoBackButton from '../../GoBackButton';

const Header = styled(Text)<{ $ms: MS }>`
  margin-bottom: ${({ $ms }) => $ms(30, 0.5)}px;
  font-size: ${({ $ms }) => $ms(30, 1)}px;
  color: rgb(191 245 205);
`;

const AcolytesList = ({
  onPressGoBackButton,
  backgroundImgSrc,
  headerText,
  fieldToFilterAcolytesBy,
}: AcolytesListProps) => {
  const { isLoading } = useContext(IsLoadingContext)!;
  const { acolytes } = useContext(AcolytesContext)!;

  const { ms } = useMetrics();

  return (
    <ScreenContainer backgroundImgSrc={backgroundImgSrc}>
      <ScrollView
        contentContainerStyle={{
          padding: ms(30, 0.5),
          paddingBlockStart: ms(62.5, 0.9),
        }}
        showsVerticalScrollIndicator={false}
      >
        <Header $ms={ms}>{headerText}</Header>

        {isLoading ? (
          <CircleSpinner />
        ) : (
          acolytes.map(acolyte => {
            return (
              acolyte[fieldToFilterAcolytesBy as keyof KaotikaUser] && (
                <AcolytesListItem
                  key={acolyte._id}
                  avatar={acolyte.avatar}
                  nickname={acolyte.nickname}
                />
              )
            );
          })
        )}
      </ScrollView>

      <GoBackButton onPress={onPressGoBackButton} />
    </ScreenContainer>
  );
};

export default AcolytesList;
