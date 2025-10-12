interface GeneralModalProps {
  message: string;
  setMessage: SetGeneralModalMessage;
}

type SetGeneralModalMessage = (message: string) => void;

export type { GeneralModalProps, SetGeneralModalMessage };
