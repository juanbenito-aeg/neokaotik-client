import { render, screen, userEvent } from '@testing-library/react-native';
import Logout from '../../components/Logout';
import usePlayerStore from '../../store/usePlayerStore';
import * as Keychain from 'react-native-keychain';

jest.mock('react-native-google-auth', () => ({
  GoogleAuth: { signOut: jest.fn() },
}));

jest.mock('../../helpers/fcm.helpers', () => ({
  avoidDuplicateMsgIdGlitchWhenLoggingOutAndIn: jest.fn(),
  updateFcmToken: jest.fn(),
}));

// Mock the player store

jest.mock('../../store/usePlayerStore');

jest.mock('react-native-keychain');

jest.useFakeTimers();

const setUser = jest.fn();

const mockedUsePlayerStore = jest.mocked(usePlayerStore);
mockedUsePlayerStore.mockReturnValue(setUser);

describe("'Logout' component", () => {
  it("should clear the 'user' state after pressing the 'Log out' button", async () => {
    render(<Logout />);

    const user = userEvent.setup();

    const logOutButton = screen.getByText('Log out');
    await user.press(logOutButton);

    expect(setUser).toHaveBeenCalledWith(null);
  });

  it("should clear auth tokens when the 'Log out' button is pressed", async () => {
    render(<Logout />);

    const user = userEvent.setup();
    const logOutButton = screen.getByText('Log out');
    await user.press(logOutButton);

    expect(Keychain.resetGenericPassword).toHaveBeenCalledTimes(2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
