interface IsLoadingStore {
  isLoading: boolean;
  setIsLoading: SetIsLoading;
}

type SetIsLoading = (isLoading: boolean) => void;

export type { IsLoadingStore, SetIsLoading };
