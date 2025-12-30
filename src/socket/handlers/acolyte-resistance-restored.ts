import KaotikaUser, {
  KaotikaUserAttributes,
} from '../../interfaces/KaotikaUser';
import { SetAcolytes, SetUser } from '../../interfaces/player';

function handleAcolyteResistanceRestored(
  acolyteId: string,
  acolyteUpdatedAttributes: KaotikaUserAttributes,
  user: KaotikaUser,
  setUser: SetUser,
  setAcolytes: SetAcolytes,
) {
  if (acolyteId === user._id) {
    setUser(prevUser => ({
      ...prevUser,
      attributes: acolyteUpdatedAttributes,
    }));
  } else {
    setAcolytes(prevAcolytes =>
      prevAcolytes.map(prevAcolyte => {
        if (acolyteId === prevAcolyte._id) {
          return { ...prevAcolyte, attributes: acolyteUpdatedAttributes };
        }

        return prevAcolyte;
      }),
    );
  }
}

export { handleAcolyteResistanceRestored };
