import { createContext } from 'react';
import { UserContextInterface } from '../interfaces/UserContext';

export const UserContext = createContext<UserContextInterface | null>(null);
