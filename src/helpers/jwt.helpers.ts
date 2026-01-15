import * as Keychain from 'react-native-keychain';
import { AuthTokenKey } from '../constants/jwt';

async function setAccessAndRefreshTokens(
  accessToken: string,
  refreshToken: string,
) {
  await Keychain.setGenericPassword(AuthTokenKey.ACCESS, accessToken, {
    service: AuthTokenKey.ACCESS,
  });

  await Keychain.setGenericPassword(AuthTokenKey.REFRESH, refreshToken, {
    service: AuthTokenKey.REFRESH,
  });
}

export { setAccessAndRefreshTokens };
