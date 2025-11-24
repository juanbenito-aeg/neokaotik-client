import { create } from 'zustand';
import { PlayerStore } from '../interfaces/Player';

const usePlayerStore = create<PlayerStore>()(set => ({
  // User state & action
  user: null,
  setUser: nextUser => {
    set(state => ({
      user: typeof nextUser === 'function' ? nextUser(state.user!) : nextUser,
    }));
  },

  // Acolytes state & action
  acolytes: [],
  setAcolytes: nextAcolytes => {
    set(state => ({
      acolytes:
        typeof nextAcolytes === 'function'
          ? nextAcolytes(state.acolytes)
          : nextAcolytes,
    }));
  },
}));

export default usePlayerStore;
