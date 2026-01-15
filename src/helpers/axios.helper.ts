import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { AuthTokenKey } from '../constants/jwt';

const axiosInstance = axios.create({
  baseURL: 'https://neokaotik-server.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    const credentials = await Keychain.getGenericPassword({
      service: AuthTokenKey.ACCESS,
    });

    if (credentials && credentials.password) {
      config.headers['Authorization'] = `Bearer ${credentials.password}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export { axiosInstance };
