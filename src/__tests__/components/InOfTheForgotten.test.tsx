import { render, screen } from '@testing-library/react-native';
import InnOfTheForgotten from '../../components/InnOfTheForgotten';
import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';

jest.mock('../../store/usePlayerStore', () => {
  const actualState = jest
    .requireActual<typeof import('../../store/usePlayerStore')>(
      '../../store/usePlayerStore',
    )
    .default.getInitialState();

  return {
    __esModule: true,
    default: jest.fn(getterFn => {
      return getterFn({
        ...actualState,
        user: mockedPlayers[MockedPlayer.ACOLYTE],
      });
    }),
  };
});

describe('The Inn of the Forgotten', () => {
  it('should render InnOfTheForgotten correctly', () => {
    render(<InnOfTheForgotten onPressGoBackButton={() => {}} />);

    expect(screen.getByText('The Inn Of The Forgotten')).toBeTruthy();
  });
});
