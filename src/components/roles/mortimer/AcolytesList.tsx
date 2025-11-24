import AcolytesListItem from './AcolytesListItem';
import { ScrollView } from 'react-native';
import KaotikaUser from '../../../interfaces/KaotikaUser';
import { AcolytesListProps } from '../../../interfaces/AcolytesList';
import ScreenContainer from '../../ScreenContainer';
import CircleSpinner from '../../Spinner';
import GoBackButton from '../../GoBackButton';
import Header from '../../Header';
import useMetrics from '../../../hooks/use-metrics';
import usePlayerStore from '../../../store/usePlayerStore';
import { useIsLoadingStore } from '../../../store/useIsLoadingStore';

const AcolytesList = ({
  onPressGoBackButton,
  backgroundImgSrc,
  headerText,
  fieldToFilterAcolytesBy,
}: AcolytesListProps) => {
  const isLoading = useIsLoadingStore(state => state.isLoading);
  const acolytes = usePlayerStore(state => state.acolytes);

  const { ms } = useMetrics();

  return (
    <ScreenContainer backgroundImgSrc={backgroundImgSrc}>
      {isLoading ? (
        <CircleSpinner />
      ) : (
        <>
          <Header>{headerText}</Header>

          <ScrollView
            contentContainerStyle={{
              padding: ms(30, 0.5),
              paddingBlockStart: ms(125, 0.9),
            }}
            showsVerticalScrollIndicator={false}
          >
            {acolytes.map(acolyte => {
              return (
                acolyte[fieldToFilterAcolytesBy as keyof KaotikaUser] && (
                  <AcolytesListItem
                    key={acolyte._id}
                    avatar={acolyte.avatar}
                    nickname={acolyte.nickname}
                  />
                )
              );
            })}
          </ScrollView>

          <GoBackButton onPress={onPressGoBackButton} />
        </>
      )}
    </ScreenContainer>
  );
};

export default AcolytesList;
