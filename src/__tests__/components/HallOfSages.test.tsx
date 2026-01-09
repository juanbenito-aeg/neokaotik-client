import { render, screen } from '@testing-library/react-native';
import HallOfSages from '../../components/HallOfSages';
import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';

// Mock problematic package
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    setOptions: jest.fn(),
  })),
  createNavigationContainerRef: jest.fn(),
  useFocusEffect: jest.fn(),
}));

jest.mock('socket.io-client', () => {
  const originalModule = jest.requireActual('socket.io-client');

  return {
    ...originalModule,
    io: jest.fn(() => ({
      timeout: jest.fn().mockReturnThis(),
      emit: jest.fn(),
    })),
  };
});

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
        acolytes: [mockedPlayers[MockedPlayer.ACOLYTE]],
        nonAcolytes: [mockedPlayers[MockedPlayer.NON_ACOLYTE]],
      });
    }),
  };
});

jest.mock('../../store/useHallOfSageStore', () => ({
  __esModule: true,
  useHallOfSageStore: jest.fn().mockReturnValue({
    showArtifactsAnimation: true,
  }),
}));

jest.useFakeTimers();

describe('Hall of Sages', () => {
  it('should render Hall of Sages component correctly', () => {
    render(<HallOfSages onPressGoBackButton={() => {}} />);

    expect(screen.getByText('The Hall of Sages')).toBeTruthy();
  });

  it('should not display the Show Artifacts button when conditions are not met', () => {
    const allArtifactsCollected = false;

    render(<HallOfSages onPressGoBackButton={() => {}} />);

    if (!allArtifactsCollected) {
      const showArtifactsButton = screen.queryByText('Show Artifacts');
      expect(showArtifactsButton).toBeNull();
    }
  });

  it('should display an ArtifactPanel if showArtifactsAnimation is true', () => {
    render(<HallOfSages onPressGoBackButton={() => {}} />);

    const artifactsPanel = screen.findByTestId('artifacts-panel');
    expect(artifactsPanel).toBeTruthy();
  });
});
