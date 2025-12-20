import { render, screen } from '@testing-library/react-native';
import InnOfTheForgotten from '../../components/InnOfTheForgotten';

describe('The Inn of the Forgotten', () => {
  it('should render InnOfTheForgotten correctly', () => {
    render(<InnOfTheForgotten onPressGoBackButton={() => {}} />);

    expect(screen.getByText('The Inn Of The Forgotten')).toBeTruthy();
  });
});
