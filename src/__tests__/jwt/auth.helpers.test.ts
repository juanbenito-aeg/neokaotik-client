import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';
import { authenticateUser } from '../../helpers/auth.helpers';
import * as Keychain from 'react-native-keychain';
import { axiosInstance } from '../../helpers/axios.helpers';

jest.mock('../../helpers/axios.helpers', () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

jest.mock('react-native-keychain');

describe('AuthenticateUser', () => {
  const endpoint = 'login';
  const idToken = 'google-id-token';
  const fcmToken = 'fcm-token';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should store access & refresh token when server returns them', async () => {
    (axiosInstance.post as unknown as jest.Mock).mockReturnValue({
      status: 200,
      data: {
        user: mockedPlayers[MockedPlayer.ACOLYTE],
        accessToken: 'ACCESS_JWT',
        refreshToken: 'REFRESH_JWT',
      },
    });

    await authenticateUser(endpoint, idToken, fcmToken);

    expect(Keychain.setGenericPassword).toHaveBeenCalledTimes(2);
  });

  it('should not store tokens when backend does not return them', async () => {
    (axiosInstance.post as jest.Mock).mockResolvedValue({
      status: 201,
      data: {
        user: mockedPlayers[MockedPlayer.NON_ACOLYTE],
        accessToken: null,
        refreshToken: null,
      },
    });

    await authenticateUser(endpoint, idToken, fcmToken);

    expect(Keychain.setGenericPassword).not.toHaveBeenCalled();
  });
});
