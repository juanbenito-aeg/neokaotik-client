import { create } from 'zustand';
import { ModalStore } from '../interfaces/Modal';

export const useModalStore = create<ModalStore>()(set => ({
  modalData: null,
  setModalData: modalData => set(() => ({ modalData })),
}));
