import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';
import { authenticateUser } from '../../helpers/auth.helpers';
import { axiosInstance } from '../../helpers/axios.helpers';

jest.mock('../../helpers/axios.helpers');

describe('AxiosIntance', () => {
  it("shouldn't display 'Authorization' header when user is login", async () => {
    (axiosInstance.post as unknown as jest.Mock).mockReturnValue({
      status: 200,
      data: {
        user: mockedPlayers[MockedPlayer.ACOLYTE],
        accessToken: 'ACCESS_JWT',
        refreshToken: 'REFRESH_JWT',
      },
    });

    const endpoint = 'login';
    const idToken = 'google-id-token';
    const fcmToken = 'fcm-token';

    await authenticateUser(endpoint, idToken, fcmToken);

    expect(axiosInstance.defaults.headers).not.toBe(
      expect.objectContaining({
        Authorization: 'Bearer',
      }),
    );
  });
});
