import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';
import { authenticateUser } from '../../helpers/auth.helpers';
import {
  axiosInstance,
  handleRejectedPromise,
} from '../../helpers/axios.helpers';

describe('AxiosInstance', () => {
  it("shouldn't display 'Authorization' header when user is login", async () => {
    jest.spyOn(axiosInstance, 'post').mockResolvedValueOnce({
      status: 200,
      data: {
        user: mockedPlayers[MockedPlayer.ACOLYTE],
        accessToken: 'ACCESS_JWT',
        refreshToken: 'REFRESH_JWT',
      },
    });

    const endpoint = 'log-in';
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

describe("'Axios' response interceptor", () => {
  const JWT_REFRESH_ROUTE = '/jwt/refresh';

  it(`should call "${JWT_REFRESH_ROUTE}" API route when access token is expired`, async () => {
    const spy = jest
      .spyOn(axiosInstance, 'get')
      .mockResolvedValueOnce({ data: {} });

    const ACCESS_TOKEN_EXPIRED_MSG = 'Access token is expired.';

    const error = {
      response: { status: 403, data: ACCESS_TOKEN_EXPIRED_MSG },
    };

    try {
      await handleRejectedPromise(error);
    } catch (error) {
      expect(spy).toHaveBeenCalledWith(JWT_REFRESH_ROUTE);
    }
  });
});
