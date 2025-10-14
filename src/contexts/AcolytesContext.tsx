import { createContext } from 'react';
import type { AcolytesContextInterface } from '../interfaces/Acolytes';

const AcolytesContext = createContext<AcolytesContextInterface | null>(null);

export default AcolytesContext;
