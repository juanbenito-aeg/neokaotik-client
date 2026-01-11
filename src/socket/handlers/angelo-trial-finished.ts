import { AngeloTrialState, UserRole } from '../../constants/general';
import { Fields } from '../../interfaces/generics';
import {
  AngeloTrialVotes,
  SetAngeloTrialState,
  SetAngeloTrialVotes,
} from '../../interfaces/HallSages';
import { SetNonAcolytes } from '../../interfaces/player';

function handleAngeloTrialFinished(
  angeloUpdatedFields: Fields,
  setNonAcolytes: SetNonAcolytes,
  setAngeloTrialState: SetAngeloTrialState,
  setAngeloTrialVotes: SetAngeloTrialVotes,
  angeloTrialVotes?: { votes: AngeloTrialVotes },
) {
  setNonAcolytes(prevNonAcolytes =>
    prevNonAcolytes.map(prevNonAcolyte => {
      if ((prevNonAcolyte.rol = UserRole.ANGELO)) {
        return { ...prevNonAcolyte, ...angeloUpdatedFields };
      }

      return prevNonAcolyte;
    }),
  );

  setAngeloTrialState(AngeloTrialState.FINISHED);

  if (angeloTrialVotes) {
    setAngeloTrialVotes({ ...angeloTrialVotes.votes });
  }
}

export { handleAngeloTrialFinished };
