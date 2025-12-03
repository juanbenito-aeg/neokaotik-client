import KaotikaUser from '../../interfaces/KaotikaUser';
import { SetAcolytes, SetNonAcolytes } from '../../interfaces/player';

function handleEnteredExitedHS(
  acolyteOrMortimerId: string,
  isInsideHS: boolean,
  acolytes: KaotikaUser[],
  setAcolytes: SetAcolytes,
  setNonAcolytes: SetNonAcolytes,
) {
  let setPlayersToCall;

  // If updated player is acolyte, call "setAcolytes", else call "setNonAcolytes"
  if (acolytes.find(acolyte => acolyte._id === acolyteOrMortimerId)) {
    setPlayersToCall = setAcolytes;
  } else {
    setPlayersToCall = setNonAcolytes;
  }

  setPlayers(acolyteOrMortimerId, isInsideHS, setPlayersToCall!);
}

function setPlayers(
  acolyteOrMortimerId: string,
  isInsideHS: boolean,
  setPlayers: SetAcolytes | SetNonAcolytes,
) {
  setPlayers(prevPlayers => {
    const nextPlayers = prevPlayers.map(prevPlayer => {
      if (prevPlayer._id === acolyteOrMortimerId) {
        return { ...prevPlayer, is_inside_hs: isInsideHS };
      }

      return prevPlayer;
    });

    return nextPlayers;
  });
}

export default handleEnteredExitedHS;
