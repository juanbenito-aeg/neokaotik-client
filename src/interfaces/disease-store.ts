interface DiseaseStore {
  diseases: Disease[];
  setDiseases: SetDiseases;
}

interface Disease {
  _id: string;
  name: string;
  penalty: string;
}

type SetDiseases = (diseases: Disease[]) => void;

export type { DiseaseStore };
