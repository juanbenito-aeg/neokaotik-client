import { SetNonAcolytes } from '../../interfaces/player';
import { UserRole } from '../../constants/general';
import { OldSchoolLocation } from '../../constants/navigation';

function handleAngeloSubdued(setNonAcolytes: SetNonAcolytes) {
  setNonAcolytes(prevNonAcolytes =>
    prevNonAcolytes.map(prevNonAcolyte => {
      if (prevNonAcolyte.rol === UserRole.ANGELO) {
        return { ...prevNonAcolyte, location: OldSchoolLocation.HALL_OF_SAGES };
      }

      return prevNonAcolyte;
    }),
  );
}

export default handleAngeloSubdued;
