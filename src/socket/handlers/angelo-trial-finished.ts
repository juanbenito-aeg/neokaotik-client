import { AngeloTrialState, UserRole } from '../../constants/general';
import { Fields } from '../../interfaces/generics';
import {
  AngeloTrialVotes,
  SetAngeloTrialState,
  SetAngeloTrialVotes,
} from '../../interfaces/HallSages';
import { SetIsLoading } from '../../interfaces/IsLoading';
import KaotikaUser from '../../interfaces/KaotikaUser';
import { SetNonAcolytes } from '../../interfaces/player';

function handleAngeloTrialFinished(
  angeloUpdatedFields: Fields,
  user: KaotikaUser,
  setNonAcolytes: SetNonAcolytes,
  setAngeloTrialState: SetAngeloTrialState,
  setAngeloTrialVotes: SetAngeloTrialVotes,
  setIsLoading: SetIsLoading,
  angeloTrialVotes?: { votes: AngeloTrialVotes },
) {
  setNonAcolytes(prevNonAcolytes =>
    prevNonAcolytes.map(prevNonAcolyte => {
      if (prevNonAcolyte.rol === UserRole.ANGELO) {
        return { ...prevNonAcolyte, ...angeloUpdatedFields };
      }

      return prevNonAcolyte;
    }),
  );

  if (!(user.isBetrayer && user.rol === UserRole.ACOLYTE)) {
    setAngeloTrialState(AngeloTrialState.FINISHED);

    if (angeloTrialVotes) {
      setAngeloTrialVotes({ ...angeloTrialVotes.votes });
    }

    setIsLoading(false);
  }
}

export { handleAngeloTrialFinished };
