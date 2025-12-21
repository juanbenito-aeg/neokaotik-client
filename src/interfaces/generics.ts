type VoidFunction = () => void;

interface NestedScreenProps {
  onPressGoBackButton: VoidFunction;
}

interface Fields {
  [key: string]: any;
}

export type { VoidFunction, NestedScreenProps, Fields };
