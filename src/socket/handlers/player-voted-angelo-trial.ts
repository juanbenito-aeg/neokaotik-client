import { VoteAngeloTrialType } from '../../constants/general';
import { SetAcolytes, SetNonAcolytes } from '../../interfaces/player';

function handlePLayerVotedAngeloTrial(
  playerId: string,
  vote: VoteAngeloTrialType,
  setAcolytes: SetAcolytes,
  setNonAcolytes: SetNonAcolytes,
) {
  setAcolytes(prevAcolytes => {
    return prevAcolytes.map(acolyte => {
      if (acolyte._id === playerId) {
        return { ...acolyte, voteAngeloTrial: vote };
      }
      return acolyte;
    });
  });

  setNonAcolytes(prevNonAcolytes => {
    return prevNonAcolytes.map(nonAcolyte => {
      if (nonAcolyte._id === playerId) {
        return { ...nonAcolyte, voteAngeloTrial: vote };
      }
      return nonAcolyte;
    });
  });
}

export default handlePLayerVotedAngeloTrial;
