import { createContext } from 'react';
import type { AcolytesContextInterface } from '../interfaces/AcolytesContext';

const AcolytesContext = createContext<AcolytesContextInterface | null>(null);

export default AcolytesContext;
