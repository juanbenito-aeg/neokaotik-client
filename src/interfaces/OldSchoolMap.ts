import { OldSchoolLocation } from '../constants';

interface OldSchoolMapProps {
  initialLocation?: OldSchoolLocation;
  setSpecificLocation?: (initalLocation: OldSchoolLocation | undefined) => void;
}

export type { OldSchoolMapProps };
