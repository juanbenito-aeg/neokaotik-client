import { createContext } from 'react';
import { IsLoadingContextInterface } from '../interfaces/IsLoadingContext';

const IsLoadingContext = createContext<IsLoadingContextInterface | null>(null);

export default IsLoadingContext;
