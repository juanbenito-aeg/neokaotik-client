import { Location } from '../../interfaces/geolocalization';
import { SetAcolytes } from '../../interfaces/player';

function handleAcolytePositionChanged(
  setAcolytes: SetAcolytes,
  acolyteId: string,
  acolyteLocation: Location,
) {
  setAcolytes(prevAcolytes => {
    const nextAcolytes = prevAcolytes.map(prevAcolyte => {
      if (prevAcolyte._id === acolyteId) {
        const nextAcolyte = { ...prevAcolyte, location: acolyteLocation };
        return nextAcolyte;
      }

      return prevAcolyte;
    });

    return nextAcolytes;
  });
}

export default handleAcolytePositionChanged;
