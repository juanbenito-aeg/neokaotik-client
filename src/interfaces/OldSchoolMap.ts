import { OldSchoolLocation } from '../constants';

interface OldSchoolMapProps {
  initialLocation: OldSchoolLocation | null;
  setSpecificLocation: React.Dispatch<
    React.SetStateAction<OldSchoolLocation | null>
  >;
}

export type { OldSchoolMapProps };
