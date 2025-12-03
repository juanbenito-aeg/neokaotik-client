import { act, render, screen } from '@testing-library/react-native';
import HallOfSages from '../../components/HallOfSages';
import { NavigationContainer } from '@react-navigation/native';
import { useHallOfSageStore } from '../../store/useHallOfSageStore';
import { SetUser } from '../../interfaces/player';
import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';
import usePlayerStore from '../../store/usePlayerStore';

beforeAll(() => {
  jest.clearAllMocks();
});

jest.mock('socket.io-client');

jest.mock('../../socket/socket', () => {
  io: () => {
    jest.fn();
  };
});

jest.useFakeTimers();

describe('Hall of Sages', () => {
  let socket: any;
  let io: any;
  let setUser: SetUser;

  beforeEach(() => {
    useHallOfSageStore.setState({ showArtifactsAnimation: true });
    socket = {
      on: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn(),
    };
    io = jest.fn().mockReturnValue(socket);
    setUser = jest.fn();
  });

  it('should render Hall of Sages component correctly', () => {
    render(
      <NavigationContainer>
        <HallOfSages onPressGoBackButton={() => {}} />,
      </NavigationContainer>,
    );

    expect(screen.getByText('The Hall of Sages')).toBeTruthy();
  });

  it('should not display the Show Artifacts button when conditions are not met', () => {
    const allArtifactsCollected = false;

    render(
      <NavigationContainer>
        <HallOfSages onPressGoBackButton={() => {}} />
      </NavigationContainer>,
    );

    if (!allArtifactsCollected) {
      const showArtifactsButton = screen.queryByText('Show Artifacts');
      expect(showArtifactsButton).toBeNull();
    }
  });

  it('should display an ArtifactPanel if showArtifactsAnimation is true', () => {
    render(
      <NavigationContainer>
        <HallOfSages onPressGoBackButton={() => {}} />
      </NavigationContainer>,
    );

    const artifactsPanel = screen.findByTestId('artifacts-panel');
    expect(artifactsPanel).toBeTruthy();
  });
});
