import { createContext } from 'react';
import { SetModalData } from '../interfaces/Modal';

export const ModalContext = createContext<SetModalData | null>(null);
