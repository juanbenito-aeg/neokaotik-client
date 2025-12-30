import { create } from 'zustand';
import { DiseaseStore } from '../interfaces/disease-store';

const useDiseaseStore = create<DiseaseStore>()(set => ({
  diseases: [],
  setDiseases: diseases => set(() => ({ diseases })),
}));

export { useDiseaseStore };
