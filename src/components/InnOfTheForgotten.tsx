import { ScreenBackgroundImgSrc } from '../constants/image-sources';
import { NestedScreenProps } from '../interfaces/generics';
import GoBackButton from './GoBackButton';
import Header from './Header';
import ScreenContainer from './ScreenContainer';

const InnOfTheForgotten = ({ onPressGoBackButton }: NestedScreenProps) => {
  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.INN_FORGOTTEN}>
      <Header>The Inn Of The Forgotten</Header>
      <GoBackButton onPress={onPressGoBackButton}></GoBackButton>
    </ScreenContainer>
  );
};

export default InnOfTheForgotten;
