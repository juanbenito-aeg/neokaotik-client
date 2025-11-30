import { act, fireEvent, render, screen } from '@testing-library/react-native';
import HallOfSages from '../../components/HallOfSages';
import { NavigationContainer } from '@react-navigation/native';
import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';
import { SetUser } from '../../interfaces/player';
import { UserRole } from '../../constants';

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
  let onPressGoBackButton: () => void;
  let setUser: SetUser;
  let socket: any;
  let io: any;

  beforeEach(() => {
    onPressGoBackButton = jest.fn();
    socket = {
      on: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn(),
    };
    io = jest.fn().mockReturnValue(socket);
    setUser = jest.fn() as jest.Mock<SetUser>;
  });

  it('should render Hall of Sages component correctly', async () => {
    render(
      <NavigationContainer>
        <HallOfSages onPressGoBackButton={onPressGoBackButton} />,
      </NavigationContainer>,
    );

    expect(screen.getByText('The Hall of Sages')).toBeTruthy();
  });

  it('should update user is_inside_hs if their role is Acolyte or Mortimer', async () => {
    const isInsideHS: boolean = true;

    await act(async () => {
      setUser({
        ...mockedPlayers[MockedPlayer.ACOLYTE],
        is_inside_hs: isInsideHS,
      });

      expect(setUser).toHaveBeenCalledWith(
        expect.objectContaining({ is_inside_hs: isInsideHS }),
      );
    });
  });

  it('should not display the Show Artifacts button when conditions are not met', async () => {
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
});
