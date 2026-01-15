import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { AuthTokenKey } from '../constants/jwt';
import { setAccessAndRefreshTokens } from './jwt.helpers';

const axiosInstance = axios.create({
  baseURL: 'https://neokaotik-server.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const service =
      config.url === '/jwt/refresh'
        ? AuthTokenKey.REFRESH
        : AuthTokenKey.ACCESS;

    const credentials = await Keychain.getGenericPassword({ service });

    if (credentials && credentials.password) {
      config.headers['Authorization'] = `Bearer ${credentials.password}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  handleRejectedPromise,
);

async function handleRejectedPromise(error: any) {
  const ACCESS_TOKEN_EXPIRED_MSG = 'Access token is expired.';

  if (
    error.response &&
    error.response.status === 403 &&
    error.response.data === ACCESS_TOKEN_EXPIRED_MSG
  ) {
    const {
      data: { accessToken, refreshToken },
    } = await axiosInstance.get('/jwt/refresh');

    if (accessToken && refreshToken) {
      await setAccessAndRefreshTokens(accessToken, refreshToken);
      return axiosInstance(error.config);
    }
  }

  return Promise.reject(error);
}

export { axiosInstance, handleRejectedPromise };
