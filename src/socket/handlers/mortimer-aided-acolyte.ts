import { Fields } from '../../interfaces/generics';
import KaotikaUser from '../../interfaces/KaotikaUser';
import { SetUser, SetAcolytes } from '../../interfaces/player';

function handleMortimerAidedAcolyte(
  acolyteId: string,
  acolyteUpdatedFields: Fields,
  user: KaotikaUser,
  setUser: SetUser,
  setAcolytes: SetAcolytes,
) {
  if (acolyteId === user._id) {
    setUser(prevUser => ({ ...prevUser, ...acolyteUpdatedFields }));
  } else {
    setAcolytes(prevAcolytes =>
      prevAcolytes.map(prevAcolyte => {
        if (acolyteId === prevAcolyte._id) {
          return { ...prevAcolyte, ...acolyteUpdatedFields };
        }

        return prevAcolyte;
      }),
    );
  }
}

export { handleMortimerAidedAcolyte };
