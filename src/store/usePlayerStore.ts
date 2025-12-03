import { create } from 'zustand';
import { PlayerStore } from '../interfaces/player';

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

  // Non-acolytes state & action
  nonAcolytes: [],
  setNonAcolytes: nextNonAcolytes => {
    set(state => ({
      nonAcolytes:
        typeof nextNonAcolytes === 'function'
          ? nextNonAcolytes(state.nonAcolytes)
          : nextNonAcolytes,
    }));
  },
}));

export default usePlayerStore;
