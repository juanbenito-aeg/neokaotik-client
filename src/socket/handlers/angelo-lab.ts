import { UserRole } from '../../constants';
import { SetAcolytes } from '../../interfaces/Acolytes';
import { SetGeneralModalMessage } from '../../interfaces/GeneralModal';
import KaotikaUser from '../../interfaces/KaotikaUser';
import type { AcolyteDataAfterAccessExitLab } from '../../interfaces/socket';

function handleAcolyteInsideOutsideLab(
  recipientRole: string,
  acolyteData: AcolyteDataAfterAccessExitLab,
  setGeneralModalMessage?: SetGeneralModalMessage,
  acolytes?: KaotikaUser[],
  setAcolytes?: SetAcolytes,
) {
  switch (recipientRole) {
    case UserRole.ISTVAN:
      displayAcolyteEnteredExitedModal(
        setGeneralModalMessage!,
        acolyteData.nickname,
        acolyteData.isInside,
      );
      break;

    case UserRole.MORTIMER:
      updateAcolytes(
        acolyteData.email,
        acolyteData.isInside,
        acolytes!,
        setAcolytes!,
      );
      break;
  }
}

function displayAcolyteEnteredExitedModal(
  setGeneralModalMessage: SetGeneralModalMessage,
  acolyteNickname: string,
  isAcolyteInsideLab: boolean,
) {
  const message = `The acolyte named ${acolyteNickname} has just ${
    isAcolyteInsideLab ? 'entered' : 'exited'
  } Angelo's laboratory.`;

  setGeneralModalMessage(message);
}

function updateAcolytes(
  acolyteEmail: string,
  isAcolyteInsideLab: boolean,
  acolytes: KaotikaUser[],
  setAcolytes: SetAcolytes,
) {
  const updatedAcolytes = acolytes.map(acolyte => {
    if (acolyte.email === acolyteEmail) {
      return { ...acolyte, isInside: isAcolyteInsideLab };
    } else {
      return acolyte;
    }
  });

  setAcolytes(updatedAcolytes);
}

export { handleAcolyteInsideOutsideLab };
