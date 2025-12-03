import { render, screen, userEvent } from '@testing-library/react-native';
import Logout from '../../components/Logout';
import usePlayerStore from '../../store/usePlayerStore';

jest.mock('react-native-google-auth', () => ({
  GoogleAuth: { signOut: jest.fn() },
}));

jest.mock('../../helpers/fcm.helpers', () => ({
  avoidDuplicateMsgIdGlitchWhenLoggingOutAndIn: jest.fn(),
  updateFcmToken: jest.fn(),
}));

// Mock the player store

jest.mock('../../store/usePlayerStore');

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
});
