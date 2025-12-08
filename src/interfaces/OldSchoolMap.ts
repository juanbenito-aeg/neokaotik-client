import { OldSchoolLocation } from '../constants/navigation';

interface OldSchoolMapProps {
  initialLocation: OldSchoolLocation | null;
  setSpecificLocation: React.Dispatch<
    React.SetStateAction<OldSchoolLocation | null>
  >;
}

export type { OldSchoolMapProps };
