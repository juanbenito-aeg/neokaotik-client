import { UserRole } from '../../constants/general';
import { Fields } from '../../interfaces/generics';
import { SetShowAngeloAnimation } from '../../interfaces/HallSages';
import { SetIsLoading } from '../../interfaces/IsLoading';
import { SetNonAcolytes } from '../../interfaces/player';

function handleAngeloDelivered(
  angeloUpdatedFields: Fields,
  setNonAcolytes: SetNonAcolytes,
  setIsLoading: SetIsLoading,
  setShowAngeloAnimation: SetShowAngeloAnimation,
) {
  setIsLoading(false);

  setNonAcolytes(prevNonAcolytes =>
    prevNonAcolytes.map(prevNonAcolyte => {
      if (UserRole.ANGELO === prevNonAcolyte.rol) {
        return { ...prevNonAcolyte, ...angeloUpdatedFields };
      }

      return prevNonAcolyte;
    }),
  );

  setShowAngeloAnimation(true);
}

export default handleAngeloDelivered;
