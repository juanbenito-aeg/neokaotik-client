import { create } from 'zustand';
import { ModalData, ModalStore } from '../interfaces/Modal';

export const useModalStore = create<ModalStore>()(set => ({
  modalData: null,
  setModalData: (modalData: ModalData | null) => set(() => ({ modalData })),
}));
