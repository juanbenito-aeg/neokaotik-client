import { create } from 'zustand';
import { SocketStore } from '../interfaces/socket';

export const useSocketStore = create<SocketStore>()(set => ({
  isSocketReconnected: false,
  setIsSocketReconnected: isSocketReconnected =>
    set(() => ({ isSocketReconnected })),
}));
