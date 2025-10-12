import { createContext } from 'react';
import { SetGeneralModalMessage } from '../interfaces/GeneralModal';

export const ModalContext = createContext<SetGeneralModalMessage | null>(null);
